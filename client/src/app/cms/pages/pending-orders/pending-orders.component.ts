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

  confirmarOrden(id:number){
    const confirmation=true;
    this.checkoutService.confirmOrder(id,confirmation).subscribe(data=>{

    })
  
    const indice=this.ordersPending.findIndex(item=>item.id===id);
    if(indice!=-1){
      this.ordersPending.splice(indice,1);
    }
   

  }

}
