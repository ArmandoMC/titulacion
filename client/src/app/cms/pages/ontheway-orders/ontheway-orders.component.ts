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
  filterPedido: string = '';
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;
  constructor(
    private checkoutService:CheckoutService
  ) { }

  ngOnInit(): void {
    this.checkoutService.getAllOnTheWayOrders().subscribe(data=>{
      this.ordersOnTheWay=data;
    })
  }
  nextPage() {
    this.page += 4;
    this.numPagina+=1;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 4;
    if(this.numPagina>1){
        this.numPagina-=1;
     }
  }

  onSearch( search: string ) {
    this.page = 0;
    this.search = search;
  }

}
