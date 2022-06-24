import { Component, OnInit } from '@angular/core';
import { OrderPayment } from 'src/app/models/order.model';
import {CheckoutService} from '../../../services/checkout.service';
@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements OnInit {

  ordersCompleted:OrderPayment[]=[];
  constructor(
    private checkoutService:CheckoutService
  ) { }

  ngOnInit(): void {
    // this.checkoutService.getAllCompletedOrders().subscribe(data=>{
    //   this.ordersCompleted=data;
    // })

    // this.checkoutService.orders$.subscribe(data=>{
    //   data.forEach((item,index)=>{
    //     if(item.confirmation=true){
    //       this.ordersCompleted.push(item);
    //     }
    //   })
    // })
    this.checkoutService.getAllCompletedOrders().subscribe(data=>{
      this.ordersCompleted=data;
    })
  }

}
