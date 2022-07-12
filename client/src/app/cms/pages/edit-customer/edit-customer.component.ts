import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';
import {
  Customer,
  CreateCustomerDTOByAdmin,
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from '../../../models/customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  idUsuario: number = 0;
  client: Customer = {
    id: 0,
    name: '',
    last_name: '',
    dni: '',
    phone: '',
    user: {
      email: '',
      password: '',
    },
  };
  isDisabled: boolean;
  customers: any[] = [];
  userId: number = 0;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isDisabled = true;
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.userId = Number(params.get('id'));
          if (this.userId) {
            return this.customerService.getClient(this.userId);
          }
          return [null];
        })
      )
      .subscribe((data) => {
        console.log('data cliente:', data);
        if (data) {
          this.client.id=data.id;
          this.client.name = data.name;
          this.client.last_name = data.last_name;
          this.client.dni = data.dni;
          this.client.phone = data.phone;
          this.client.user.email = data.email;
        }
      });
  }
  editarCliente(f: NgForm) {
    if (!f.valid) {
    } else {
      const dto: UpdateCustomerDTO = {
        name: this.client.name,
        last_name: this.client.last_name,
        dni: this.client.dni,
        phone: this.client.phone,
        user: {
          email: this.client.user.email,
        },
      };

      this.customerService
        .updateClient(this.client.id, dto).subscribe((client) => {
          console.log('cliente actualizado', client);
          this.router.navigate(['/cms/customers']);
        });
    }
  }

  deleteClient() {
    this.customerService.deleteClient(this.client.id).subscribe(data=>{
      console.log('client eliminado:', data);
      this.router.navigate(['/cms/customers']);
    });
  }
  habilitar() {
    this.isDisabled = false;
  }
}
