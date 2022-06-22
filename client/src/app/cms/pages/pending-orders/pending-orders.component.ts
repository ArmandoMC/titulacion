import { Component, OnInit } from '@angular/core';
import { OrderPayment } from 'src/app/models/order.model';
import {CheckoutService} from '../../../services/checkout.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {

  ordersPending:OrderPayment[]=[];
  status:string='En camino';
  constructor(
    private checkoutService:CheckoutService
  ) { }

  ngOnInit(): void {
    this.checkoutService.getAllPendingOrders().subscribe(data=>{
      if(data){
        this.ordersPending=data;
        console.log(this.ordersPending)
      }
    })
  }

  confirmarOrden(id:number){
  
    this.checkoutService.confirmOrder(id,this.status).subscribe(data=>{
      console.log('orden confirmada por admin',data)
    })
  }

}
