import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { AlertsService } from 'src/app/services/alerts.service';
import {
  Customer,
  UpdateCustomerDTO,
} from '../../../models/customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
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
    private alertsService: AlertsService,
  ) {
    this.isDisabled = true;
  }

  ngOnInit(): void {
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
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
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
        .updateClient(this.client.id, dto).subscribe(() => {
          this.alertsService.alertaSuccessTop('top-end','success','Cliente modificado',false,1500);
          this.router.navigate(['/cms/customers']);
        },(()=>{
          this.alertsService.alertaFailTop('top-end','error','Error!!','Error al editar cliente',false,1500);
        }));
    }
  }

  deleteClient() {
    this.alertsService.alertaDelete('Estas seguro?','No podrás revertir los cambios','warning',true,'#3085d6',
    '#d33','Si, eliminar').then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteClient(this.client.id).subscribe(data=>{
          this.alertsService.alertaSuccessTop('top-end','success','Cliente eliminado',false,1500);
          this.router.navigate(['/cms/customers']);
        });
      }
    });
    
  }
  habilitar() {
    this.isDisabled = false;
  }
}
