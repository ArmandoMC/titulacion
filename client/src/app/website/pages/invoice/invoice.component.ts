import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {CheckoutService} from '../../../services/checkout.service';
import { OrderPayment } from 'src/app/models/order.model';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  orderId:string| null = null;
  //detalle de orden
  orderDetail:any;
  nameProduct:string;
  quantity:number;
  price:number;
  //datos dde orden
  order:any;
  orderTotal:number;
  orderStatus:number;
  orderAddress:string;
  nameCustomer:string;
  emailCustomer:string;
  dniCustomer:string;
  phoneCustomer:string;
  numFactura:string;
  fechaFactura:Date;
  total:number;
  ///
  tarifaFija:number=3.50;

  constructor(
    private route: ActivatedRoute,
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
      if(data){
        this.order=data.order;
        this.orderDetail=data.detail;
        console.log('orden impresa front:',this.order)
        this.nameCustomer=this.order.name;
        this.orderAddress=this.order.address;
        this.emailCustomer=this.order.email;
        this.dniCustomer=this.order.dni;
        this.phoneCustomer=this.order.phone;
        this.numFactura=this.order.num_factura;
        this.total=this.order.total;
        this.fechaFactura=this.order.created_at;
        console.log('detalle orden impresa front:',this.orderDetail)
        this.nameProduct=this.orderDetail.name;
        this.quantity=this.orderDetail.quantity;
        this.price=this.orderDetail.price;
      }
     
    })

  }

}
