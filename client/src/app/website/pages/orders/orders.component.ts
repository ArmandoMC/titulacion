import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {CheckoutService} from '../../../services/checkout.service';
import {AuthService} from '../../../services/auth.service';
import {CustomerService} from '../../../services/customer.service';
import { switchMap,tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { OrderPayment } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  idUsuario:number;
  idCliente:number;
  user:User;
  orders:any[]=[];
  detailOrder:any[]=[];
  direccion:string;
  fecha:Date;
  total:number;
  constructor(
    private checkoutService:CheckoutService,
    private authService:AuthService,
    private customerService:CustomerService,
    private router:Router,
    private location:Location
  ) { 
  }

  ngOnInit(): void {
    this.authService.user$
    .pipe(
      switchMap((user)=>this.customerService.getClient(user.id))
    )
    
    
    .subscribe(cliente=>{
      // this.idUsuario=usu.id;
      
        this.checkoutService.getOrderByCustomer(cliente.id).subscribe()
        
    });
    

    this.checkoutService.orders$.subscribe(dt=>{
      
        if(dt){
          this.orders=dt;
        }
      })
      
  }
  verDetalle(id:number,idAddress:number){
    this.checkoutService.getOrderDetail(id).subscribe(data=>{
      if(data){
        this.detailOrder=data;
        
      }
    }
    )
    const dato=this.orders.find(or=>or.id===id);
    if(dato){
      this.fecha=dato.created_at;
      this.total=dato.total;
    }
    this.checkoutService.getAddressByOrderId(idAddress).subscribe(dt=>{
      console.log('nombre dir:',dt.address)
      this.direccion=dt.address;
    })
  }
  

}
