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
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  idOrder:number;
  idUsuario:number;
  idCliente:number;
  user:User;
  orders:any[]=[];
  detailOrder:any[]=[];
  direccion:string;
  fecha:Date;
  total:number;
  estado:string;
  dirEnvio:Address={
    id:0,
  address:'',
  city:'',
  state:'',
  country:'',
  postal_code:'',
  user_id:0
  };
  constructor(
    private checkoutService:CheckoutService,
    private authService:AuthService,
    private customerService:CustomerService,
    private router:Router,
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
        console.log('detalle de orden',data)
        this.detailOrder=data;
        
      }
    })
   
    const dato=this.orders.find(or=>or.id===id);
    if(dato){
      this.fecha=dato.created_at;
      this.total=dato.total;
      this.estado=dato.status;
      this.idOrder=dato.id;
    }
    this.checkoutService.getAddressByOrderId(idAddress).subscribe(dt=>{
      console.log('direccion del backen:',dt)
      this.dirEnvio=dt;
    })
    
  }
  

}
