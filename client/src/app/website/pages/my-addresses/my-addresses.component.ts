import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Address, CreateAddressDTO } from 'src/app/models/address.model';
import{AddressService} from '../../../services/address.service';
import{AuthService} from '../../../services/auth.service';
import{CustomerService} from '../../../services/customer.service';
@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.css']
})
export class MyAddressesComponent implements OnInit {

  addresses: Address[] = [];
  idUsuario: number;
  customer_id:number=0;

  name_lastname: string;
  telefono: string;
  city: string;
  address: string;
  state: string;
  country: string;
  postal_code: string;
  showAddForm: boolean = false;
  showStep1: boolean = true;
  showStep2: boolean = false;
  showStep3: boolean = false;
  address_id:number=0;

  disabledStep1:boolean=false;
  disabledStep2:boolean=false;
  btn_selected:boolean;

  constructor(
    private addressService:AddressService,
    private authService:AuthService,
    private customerService:CustomerService
  ) { }

  ngOnInit(): void {
    this.btn_selected=false;
    // this.authService.user$
    // .subscribe(data=>{
    //   this.idUsuario = data.id;
    //   this.addressService.getAllAddress(this.idUsuario).subscribe();

    // });

    
    // this.addressService.addresses$.subscribe((data) => {
    //     this.addresses = data;
      
    // });
  }
  // changeColor=[false,false,false]
  
  // cambiarEstado(){
  // }
  // addAddress() {
  //   const newAddress: CreateAddressDTO = {
  //     name_lastname: this.name_lastname,
  //     telefono: this.telefono,
  //     address: this.address,
  //     city: this.city,
  //     state: this.state,
  //     country: this.country,
  //     postal_code: this.postal_code,
  //     user_id: this.idUsuario,
  //   };
  //   this.addressService.create(newAddress).subscribe((data) => {
  //       console.log('direccion añadida');
  //     },
  //     (error) => {console.log('error al agregar difeccion');
  //   }
  //   );
  //   this.showAddForm = false;
  // }
  // capturar() {
  //   this.showAddForm = true;
  // }
  // cancelar() {
  //   this.showAddForm = false;
  // }
  // goToStep2(addressId:number) {
  //   // this.showStep1=false;
  //   this.showStep2=true;
  //   // this.btn_selected=true;
  //   this.addressService.updateVector(addressId); 
    
  //   console.log('addres_id',addressId)
  // }
  // bactToStep1(){
  //  this.showStep1=true;
  //  this.showStep2=false;
  // }
}
