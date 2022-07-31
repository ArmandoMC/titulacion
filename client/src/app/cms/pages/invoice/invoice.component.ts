import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {CheckoutService} from '../../../services/checkout.service';
import {StoreService} from '../../../services/store.service';
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
  tarifaFija:number=0;
  numeroProductos:number=0;
  subtotal:number=0;
  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private storeService: StoreService,
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
        this.subtotal=this.orderDetail.reduce((sum,item)=>sum+(item.price*item.quantity),0);
        this.tarifaFija=this.total-this.subtotal;
      }
     
    })
    this.storeService.myCart$.subscribe((data) => {
      this.numeroProductos=data.reduce((sum,item)=>sum+item.oferta,0);
      this.tarifaFija=this.numeroProductos*0.35;

    });
  }

  imprimir(){
    
    const doc = new jsPDF('p','mm','letter');
    const logo = new Image();
    logo.src = '../../../../assets/images/logo4.png';
    doc.setFont('bold');
    // doc.text('SISTEMA WEB DIMA',80,10)
    doc.addImage(logo, 'JPG', 90, 5,40,20);

    doc.setFontSize(8)
    doc.text('Factura N°'+this.numFactura,163,10)
    doc.setFontSize(10)
    doc.text('Venta al por menor de lácteos',89,30)
    doc.text('Tel.: 0989792475 - 072184087',89,40)
    doc.text('E-mail: lacteosdima@gmail.com',88,50)
    // doc.text('SISTEMA WEB DIMA',doc.internal.pageSize.width,50,null,null,{align:'center'})
    autoTable(doc,{margin:{top:50}})
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

    autoTable(doc,{margin:{top:90}})
    autoTable(doc,{html:'#formFactura'},)
   
    autoTable(doc,{html:'#formTotales'});
    doc.setFontSize(18);
    // doc.text('Gracias por su compra!!',80,200)

    doc.save('Prueba.pdf');

  }

}
