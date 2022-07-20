import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { AlertsService } from '../../../services/alerts.service';
import { Customer } from '../../../models/customer.model';
import { NgForm } from '@angular/forms';
import { CreateAddressDTO } from 'src/app/models/address.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  @ViewChild('addForm') clientForm: NgForm;
  client2: Customer = {
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
  address: CreateAddressDTO = {
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    user_id: 0,
  };
  constructor(
    private customerService: CustomerService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  addClient(f: NgForm) {
    if (!f.valid) {
      this.alertsService.alertaFailTop(
        'top-end',
        'error',
        'Error!!',
        'Formulario no válido',
        false,
        1500
      );
    } else {
      const newCustomer: any = {
        name: this.client2.name,
        last_name: this.client2.last_name,
        dni: this.client2.dni,
        phone: this.client2.phone,
        user: {
          email: this.client2.user.email,
          password: this.client2.user.password,
        },
      };
      this.customerService.createByAdmin(newCustomer).subscribe((cliente) => {
        console.log('cliente creado:', cliente);
        this.clientForm.resetForm();
        this.alertsService.alertaSuccessTop(
          'top-end',
          'success',
          'Cliente agregado',
          false,
          1500
        );
        this.router.navigate(['/cms/customers']);
      }),
        () => {
          this.alertsService.alertaFailTop(
            'top-end',
            'error',
            'Error!!',
            'Error al agregar cliente',
            false,
            1500
          );
        };
    }
  }
}
