import { Component, OnInit } from '@angular/core';
import { OrderPayment } from 'src/app/models/order.model';
import {CheckoutService} from '../../../services/checkout.service';
import {DatePipe} from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
interface mes{
  name:string;
  value:number;
}
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  
  orders:OrderPayment[]=[];
  meses:mes[]=[];
  today:Date=new Date();
  anio=this.today.getFullYear();
  mes=this.today.getMonth();
  dia=this.today.getDay();
  // fe:Date=new Date(this.anio,this.mes,this.dia);
  fechaInicial=null;
  fechaInicialSelect=null;
  fechaFinal=null;
  fechaFinalSelect=null;
  total:number=0;
  pipe=new DatePipe('en-US');
  
  public page: number = 0;
  public search: string = '';
  public numPagina:number=1;
  constructor(
    private checkoutService:CheckoutService
  ) { }

  ngOnInit(): void {
    this.checkoutService.getAllPendingOrders().subscribe(data=>{
      this.orders=data;
      this.fechaInicial=this.pipe.transform(Date.now(),'dd/MM/yyyy');
      this.fechaFinal=this.pipe.transform(Date.now(),'dd/MM/yyyy');
    })
  }

  onSelect(event){
    console.log(event.target.value);
    this.fechaInicialSelect=event.target.value;
    this.fechaInicial=this.pipe.transform(this.fechaInicialSelect,'dd/MM/yyyy');

    console.log('fecha inicial:',this.fechaInicial)
  }
  onSelect2(event){
    console.log(event.target.value);
    this.fechaFinalSelect=event.target.value;
    this.fechaFinal=this.pipe.transform(this.fechaFinalSelect,'dd/MM/yyyy');

    console.log('fecha final:',this.fechaFinal)
  }
  nextPage() {
    this.page += 2;
    this.numPagina+=1;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 2;
    if(this.numPagina>1){
      this.numPagina-=1;
    }
  }

  onSearch( search: string ) {
    this.page = 0;
    this.search = search;
  }
  imprimir(){
    const doc = new jsPDF('p','mm','letter');
    const logo = new Image();
    logo.src = '../../../../assets/images/car.jpg';
    doc.setFont('bold');
    doc.text('SISTEMA WEB DIMA',80,10)
    doc.setFontSize(8)
    // doc.text('Factura N°'+this.numFactura,163,10)
    doc.setFontSize(10)
    doc.text('Venta al por menor de yogurt y lácteos',81,20)
    doc.text('Tel.: 0989792475 - 072184087',85,30)
    doc.text('E-mail: lacteosdima@gmail.com',85,40)
    // doc.text('SISTEMA WEB DIMA',doc.internal.pageSize.width,50,null,null,{align:'center'})
    doc.addImage(logo, 'JPG', 5, 5,30,30);
    autoTable(doc,{margin:{top:40}})
    // autoTable(doc, {
    //   head: [['FACTURAR A']],
    //   body: [
    //     ['Señor(a)  :'+this.nameCustomer],
    //     ['Cédula    :'+this.dniCustomer],
    //     ['Dirección :'+this.orderAddress],
    //     ['Teléfono  :'+this.phoneCustomer],
    //     ['E-mail      :'+this.emailCustomer],

    //   ],
    // })
    autoTable(doc,{margin:{top:70}});
    doc.text('REPORTE DE VENTAS',85,50);

    autoTable(doc,{html:'#tabla-ventas'},);
   
    autoTable(doc,{html:'#tabla-resultados'});
    doc.setFontSize(18);
    // doc.text('Gracias por su compra!!',80,200)

    doc.save('Prueba.pdf');
  }
 
}
