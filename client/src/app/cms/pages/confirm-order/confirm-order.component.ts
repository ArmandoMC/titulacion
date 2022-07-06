import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {CheckoutService} from '../../../services/checkout.service';
@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  orderId:string| null = null;
  estado:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checkoutService: CheckoutService,

  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap((params)=>{
        this.orderId=params.get('id');
        if(this.orderId){
          return this.checkoutService.getOrder(this.orderId);
        }
        return [null];

      })
    )
    .subscribe(data=>{
      this.estado=data.order.status;
      console.log('estadod e orden:',this.estado)
    })
  }

  confirmarOrden(){
    let status:string;
    if(this.estado=="Preparando tu pedido"){
      status='Pedido en camino';
      this.checkoutService.confirmOrder(Number(this.orderId),status).subscribe(data=>{
        console.log('estado de orden cambiado a: en camino',data);
        this.router.navigate(['/cms/orders/pendientes']);
      })
    }else{
      status='Pedido entregado';
      this.checkoutService.confirmOrder(Number(this.orderId),status).subscribe(data=>{
        console.log('estado de orden cambiado a: entregado',data);
        this.router.navigate(['/cms/orders/en-camino']);
      })
    }
   
  
  }

}
