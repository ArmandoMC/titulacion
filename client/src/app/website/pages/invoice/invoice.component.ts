import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {CheckoutService} from '../../../services/checkout.service';
import { OrderPayment } from 'src/app/models/order.model';
import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';
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
  isVisible:boolean=false;
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

  imprimir(){
    
    const doc = new jsPDF('p','mm','letter');
    const logo = new Image();
    logo.src = '../../../../assets/images/car.jpg';
    doc.setFont('bold');
    doc.text('SISTEMA WEB DIMA',80,10)
    doc.setFontSize(8)
    doc.text('Factura N°'+this.numFactura,163,10)
    doc.setFontSize(10)
    doc.text('Venta al por menor de yogurt y lácteos',81,20)
    doc.text('Tel.: 0989792475 - 072184087',85,30)
    doc.text('E-mail: lacteosdima@gmail.com',85,40)
    // doc.text('SISTEMA WEB DIMA',doc.internal.pageSize.width,50,null,null,{align:'center'})
    doc.addImage(logo, 'JPG', 5, 5,30,30);
    autoTable(doc,{margin:{top:40}})
    autoTable(doc, {
      head: [['FACTURAR A']],
      body: [
        ['Señor(a)  :'+this.nameCustomer],
        ['Cédula    :'+this.dniCustomer],
        ['Dirección :'+this.orderAddress],
        ['Teléfono  :'+this.phoneCustomer],
        ['E-mail      :'+this.emailCustomer],

      ],
    })

    autoTable(doc,{margin:{top:70}})
    autoTable(doc,{html:'#formFactura'},)
   
    autoTable(doc,{html:'#formTotales'});
    doc.setFontSize(18);
    // doc.text('Gracias por su compra!!',80,200)

    doc.save('Prueba.pdf');

  }

}
