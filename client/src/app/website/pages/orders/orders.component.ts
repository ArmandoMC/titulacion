import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CheckoutService} from '../../../services/checkout.service';
import {AuthService} from '../../../services/auth.service';
import {CustomerService} from '../../../services/customer.service';
import { switchMap,tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;
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
    private customerService:CustomerService
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
  nextPage() {
    this.page += 20;
    this.numPagina+=1;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 20;
    if(this.numPagina>1){
        this.numPagina-=1;
     }
  }

  onSearch( search: string ) {
    this.page = 0;
    this.search = search;
  }
  

}
