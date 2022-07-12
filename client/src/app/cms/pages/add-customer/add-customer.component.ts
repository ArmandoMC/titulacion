import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {CustomerService} from '../../../services/customer.service';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {Customer,CreateCustomerDTOByAdmin, CreateCustomerDTO,UpdateCustomerDTO} from '../../../models/customer.model';
import { NgForm } from '@angular/forms';
import { Address,CreateAddressDTO } from 'src/app/models/address.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  @ViewChild('addForm') clientForm:NgForm;
  client2:Customer={
    id:0,
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
  idUsuario:number=0;
  constructor(
    private customerService:CustomerService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {

  }
  addClient(f:NgForm){
    if(!f.valid){

    }else{
      const newCustomer:any={
        name:this.client2.name,
        last_name:this.client2.last_name,
        dni:this.client2.dni,
        phone:this.client2.phone,
        user:{
          email:this.client2.user.email,
          password:this.client2.user.password
        }
      }
      this.customerService.createByAdmin(newCustomer).subscribe(cliente=>{
        console.log('cliente creado:', cliente)
        this.clientForm.resetForm();
        this.router.navigate(['/cms/customers']);
      })

    }
  }

}
