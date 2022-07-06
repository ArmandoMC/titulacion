import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';
import {OrderPayment} from '../../../models/order.model';
@Component({
  selector: 'app-ontheway-orders',
  templateUrl: './ontheway-orders.component.html',
  styleUrls: ['./ontheway-orders.component.css']
})
export class OnthewayOrdersComponent implements OnInit {

  ordersOnTheWay:OrderPayment[]=[];
  constructor(
    private checkoutService:CheckoutService
  ) { }

  ngOnInit(): void {
    this.checkoutService.getAllOnTheWayOrders().subscribe(data=>{
      this.ordersOnTheWay=data;
    })
  }

}
