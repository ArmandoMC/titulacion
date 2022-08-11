import { Component, OnInit } from '@angular/core';
import { OrderPayment } from 'src/app/models/order.model';
import {CheckoutService} from '../../../services/checkout.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {format} from'date-fns';

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
  fechaInicial:any;
  fechaFinal:any;
  total:number=0;
  public page: number = 0;
  public search: string = '';
  public numPagina:number=1;
  mostrar:boolean=false;
  mostrar2:boolean=false;
  constructor(
    private checkoutService:CheckoutService
  ) { }

  ngOnInit(): void {
    this.checkoutService.getAllCompletedOrders().subscribe(data=>{
      this.orders=data;
    })
  }

  onSelect(event){
    const date=event.target.value;
    if(date){
      this.mostrar=true;
    }
    const prototypeDate=new Date(`${date}T00:00:00`);
    console.log('protodate:',prototypeDate)
   
    // const cad=this.cadena.split('-');
    // this.anio2=Number(cad[0]);
    // this.mes2=Number(cad[1]);
    // this.dia2=Number(cad[2]);
    // const nuevaFecha=new Date(this.anio2,this.mes2,this.dia2);
   
    this.fechaInicial=format(prototypeDate,'dd-MM-yyyy');
    console.log('fecha con format:',this.fechaInicial)
    // console.log('tipo de fecha con format:',typeof(fechaConFormat))
    // this.fechaInicial=this.pipe.transform(this.fechaInicialSelect,'dd/MM/yyyy');

  }
  onSelect2(event){
    // console.log(event.target.value);
    // this.fechaFinalSelect=event.target.value;
    // this.fechaFinal=this.pipe.transform(this.fechaFinalSelect,'dd/MM/yyyy');
    const date=event.target.value;
    if(date){
      this.mostrar2=true;
    }
    const prototypeDate=new Date(`${date}T00:00:00`);
    this.fechaFinal=format(prototypeDate,'dd-MM-yyyy');
    console.log('fecha final:',this.fechaFinal)
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
  imprimir(){
    const doc = new jsPDF('p','mm','letter');
    const logo = new Image();
    logo.src = '../../../../assets/images/logo4.png';
    doc.addImage(logo, 'JPG', 90, 5,38,17);
    doc.setFontSize(11);
    doc.setTextColor('#159983');
    doc.setFont('bold');
    doc.text('Venta al por menor de lácteos',86,28);
    doc.setTextColor('#44c8b2');
    doc.setFontSize(10);
    doc.setFont('normal');
    doc.text('Ciudadela Los Vergeles',91,32);
    doc.text('Tel.: 0989792475 - 072184087',86,36);
    doc.text('E-mail: mariamorocho1965@gmail.com',80,40);
    autoTable(doc,{margin:{top:40}});
    autoTable(doc,{head:[['REPORTE DE VENTAS']],styles:{halign:'center',minCellHeight:10,cellPadding:3,
    fillColor:'#159983'}})
    autoTable(doc,{html:'#tabla-ventas',headStyles:{fillColor:'#159983'},bodyStyles:{fillColor:false,lineWidth:0.1}});
   
    autoTable(doc,{html:'#tabla-resultados',bodyStyles:{cellPadding:[2,2,2,73]}});
    doc.setFontSize(18);
    doc.save('Reporte de ventas.pdf');
  }
 
}
