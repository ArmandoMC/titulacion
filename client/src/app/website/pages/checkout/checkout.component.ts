import { Component, OnInit } from '@angular/core';
import { Address, CreateAddressDTO } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  addresses: Address[] = [];
  name_lastname: string;
  telefono: string;
  city: string;
  address: string;
  state: string;
  country: string;
  postal_code: string;
  idUsuario: number;
  logueado: boolean = false;
  showAddForm: boolean = false;
  showStep1:boolean=true;
  constructor(
    private authService: AuthService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      if (data) {
        this.idUsuario = data.id;
      }
    });

    this.addressService.getAllAddress(this.idUsuario).subscribe();

    this.addressService.addresses$.subscribe((data) => {
      if (data) {
        this.addresses = data;
      } else {
        // this.addAddress=[] as Address[];
      }
    });
  }
  addAddress() {
    const newAddress: CreateAddressDTO = {
      name_lastname: this.name_lastname,
      telefono: this.telefono,
      address: this.address,
      city: this.city,
      state: this.state,
      country: this.country,
      postal_code: this.postal_code,
      user_id: this.idUsuario,
    };
    this.addressService.create(newAddress).subscribe(
      (data) => {
        console.log('direccion añadida');
      },
      (error) => {
        console.log('error al agregar difeccion');
      }
    );
    this.showAddForm=false;
  }
  capturar() {
    this.showAddForm = true;
  }
  cancelar(){
    this.showAddForm=false;
  }
  step2(){
    this.showStep1=false;
  }
}
