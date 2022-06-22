import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateCustomerDTO } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import{OnExit} from '../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnExit {

  
  name:string;
  last_name:string;
  phone:string;
  email:string;
  password:string;
  repeatPassword:string;
  role:string;

  constructor(
    private customerService:CustomerService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  createCustomer(){

    const customer:CreateCustomerDTO={
       name:this.name,
       last_name:this.last_name,
       phone:this.phone,
       user:{
         email:this.email,
         password:this.password,
         role:'admin'
       }
    }
    this.customerService.create(customer)
    .subscribe(data=>{
    console.log( data);
    this.router.navigate(['/login']);

    },err=>console.log(err))


  }

  onExit(){
    const rta=confirm('Logica desde component, estas seguro de salir');
    return rta;
  }

}
