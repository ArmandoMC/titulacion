import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {Customer,CreateCustomerDTOByAdmin} from '../../../models/customer.model';
import { NgForm } from '@angular/forms';
import { Address,CreateAddressDTO } from 'src/app/models/address.model';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @ViewChild('clientForm') clientForm:NgForm;
  @ViewChild('botonCerrar') botonCerrar:ElementRef;
  idUsuario:number;
  client:CreateCustomerDTOByAdmin={
    name:'',
    last_name:'',
    dni:'',
    phone:'',
    user:{
      email:'',
      password:''
    }
  }
  address:CreateAddressDTO={
    address:'',
    city:'',
    state:'',
    country:'',
    postal_code:'',
    user_id:0
  }
  customers:any[]=[];
  constructor(
    private customerService:CustomerService,
    private userService:UserService,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {

    this.authService.user$.subscribe(user=>{
      this.idUsuario=user.id;
    })


    this.customerService.getAll().subscribe(data=>{
      this.customers=data;
      console.log('clientes:',this.customers)
    })
  }
  addClient(f:NgForm){
    if(!f.valid){

    }else{
      
    }
  }

}
