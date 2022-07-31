import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { OrderPayment } from 'src/app/models/order.model';
import {CheckoutService} from '../../../services/checkout.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {

  ordersPending:OrderPayment[]=[];
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;
  // status:string='En camino';
  constructor(
    private checkoutService:CheckoutService,
    private router:Router
  ) { }

  ngOnInit(): void {
    
    this.checkoutService.getAllPendingOrders().subscribe()
    this.checkoutService.orders$.subscribe(dta=>{
     this.ordersPending=dta;
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
