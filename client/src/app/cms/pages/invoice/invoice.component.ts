import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {CheckoutService} from '../../../services/checkout.service';
import {StoreService} from '../../../services/store.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {format} from'date-fns';
import { Location } from '@angular/common';


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
  orderTotal:number=0;
  orderStatus:number=0;
  orderAddress:string="";
  nameCustomer:string="";
  lastNameCustomer:string="";
  emailCustomer:string="";
  dniCustomer:string="";
  phoneCustomer:string="";
  numFactura:string="";
  fechaFactura:Date;
  fechaFormateada:string="";
  total:number=0;
  isVisible:boolean=false;
  ///
  tarifaFija:number;
  numeroProductos:number=0;
  subtotal:number=0;
  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private storeService: StoreService,
    private location: Location,

  ) {this.tarifaFija=2; }

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
        this.nameCustomer=this.order.name+" "+this.order.last_name;;
        // this.lastNameCustomer=this.order.last_name;
        this.orderAddress=this.order.address;
        this.emailCustomer=this.order.email;
        this.dniCustomer=this.order.dni;
        this.phoneCustomer=this.order.phone;
        this.numFactura=this.order.num_factura;
        
        this.total=this.order.total;
        this.fechaFactura=this.order.created_at;
        this.fechaFormateada=format(new Date(this.order.created_at),'dd/MM/yyyy');
        console.log('detalle orden impresa front:',this.fechaFormateada)
        this.nameProduct=this.orderDetail.name;
        this.quantity=this.orderDetail.quantity;
        this.price=this.orderDetail.price;
        this.subtotal=this.orderDetail.reduce((sum,item)=>sum+(item.price*item.quantity),0);
      }
     
    })
    this.storeService.myCart$.subscribe((data) => {
      this.numeroProductos=data.reduce((sum,item)=>sum+item.oferta,0);
      // this.tarifaFija=this.numeroProductos*0.35;

    });
  }

  goToBack() {
    this.location.back();
  }
  imprimir(){
    
    const doc = new jsPDF('p','mm','letter');
    const logo = new Image();
    logo.src = '../../../../assets/images/logo4.png';
    doc.addImage(logo, 'JPG', 90, 5,38,17);
    doc.setFontSize(11);
    doc.setTextColor('#159983');
    doc.setFont('bold');
    doc.text('Venta al por menor de lácteos',86,26);
    // doc.setTextColor('#44c8b2');
    // doc.setFontSize(10);
    // doc.setFont('normal');
    // doc.text('Ciudadela Los Vergeles',91,32);
    // doc.text('Tel.: 0989792475 - 072184087',86,36);
    // doc.text('E-mail: mariamorocho1965@gmail.com',80,40);
    // autoTable(doc,{margin:{top:40}});
    // autoTable(doc,{head:[['REPORTE DE PROVEEDORES']],styles:{halign:'center',minCellHeight:10,cellPadding:3,
    // fillColor:'#159983'}})
    // doc.text('SISTEMA WEB DIMA',doc.internal.pageSize.width,50,null,null,{align:'center'})
    // autoTable(doc,{margin:{top:50}})
    // autoTable(doc, {
    //   head: [['FACTURAR A']],
    //   headStyles:{fillColor:'white',textColor:'black',lineWidth:0.1},
    //   theme:'grid',margin:{left:20},
    //   body: [
    //     ['Señor(a)  :'+this.nameCustomer],
    //     ['Cédula    :'+this.dniCustomer],
    //     ['Dirección :'+this.orderAddress],
    //     ['Teléfono  :'+this.phoneCustomer],
    //     ['E-mail      :'+this.emailCustomer],

    //   ], bodyStyles:{fillColor:false,lineWidth:0.1},tableWidth:80
    // })
    //Datos sobre negocio
        doc.setTextColor('black')
        doc.setFontSize(10);
        doc.setFont('helvetica','normal','bold');
        doc.text('TIENDA DE PRODUCTOS LACTEOS DIMA',17,40);
        doc.setFontSize(8);
        doc.text('Direccion:',17,46);
        doc.setFont('helvetica','normal','normal');
        doc.text('Ciudadela Los Vergeles AV. I y Calle 4TA',17,51);
        doc.setFont('helvetica','normal','bold');
        doc.text('Contribuyente Régimen Simplificado:',17,58);
        doc.setFont('helvetica','normal','normal');
        doc.text('Si',70,58);
        doc.setFontSize(10);
        doc.setFont('helvetica','normal','bold');
        doc.text('R.U.C:',113,40);
        doc.setFont('helvetica','normal','normal');
        doc.text('0702838251001',133,40);
        doc.setFont('helvetica','normal','bold');
        //Datos sobre N° factura
        doc.text('FACTURA',113,45);
        doc.setFontSize(8);
        doc.text('N°',113,51);
        doc.setFont('helvetica','normal','normal');
        doc.text(`${this.numFactura}`,117,51);
        doc.setFont('helvetica','normal','bold');
        doc.text('Ambiente:',113,58);
        doc.setFont('helvetica','normal','normal');
        doc.text('PRODUCCIÓN',133,58);
        doc.setFont('helvetica','normal','bold');
        doc.text('Emisión:',113,63);
        doc.setFont('helvetica','normal','normal');
        doc.text('NORMAL',133,63);
        //Datos del cliente
        doc.setFont('helvetica','normal','bold');
        doc.text('Razón social/Nombres y Apellidos:',17,74);
        doc.setFont('helvetica','normal','normal');
        doc.text(`${this.nameCustomer.toUpperCase()}`,67,74);
        doc.setFont('helvetica','normal','bold');
        doc.text('Ruc/C.I.:',133,74);
        doc.setFont('helvetica','normal','normal');
        doc.text(`${this.dniCustomer}`,165,74);
        doc.setFont('helvetica','normal','bold');
        doc.text('Dirección:',17,79);
        doc.setFont('helvetica','normal','normal');
        doc.text(`${this.orderAddress}`,67,79);
        doc.setFont('helvetica','normal','bold');
        doc.text('Correo electrónico:',133,79);
        doc.setFont('helvetica','normal','normal');
        doc.text(`${this.emailCustomer}`,165,79);
        doc.setFont('helvetica','normal','bold');
        doc.text('Fecha Emisión:',17,84);
        doc.setFont('helvetica','normal','normal');
        doc.text(`${this.fechaFormateada}`,67,84);
        doc.setFont('helvetica','normal','bold');
        doc.text('Teléfono:',133,84);
        doc.setFont('helvetica','normal','normal');
        doc.text(`${this.phoneCustomer}`,165,84);


    autoTable(doc,{
      // columns:['TIENA','MARIA'],
      // columnStyles:{europe:{textColor:'red'},america:{textColor:'blue'},
      // column1:{
      //   // cellWidth:45,
      //   fontStyle:'bold',
      //   textColor:'red'

      // },
      body:[
       [['']],[['']],[['']],[['']],
        // [['TIENDA DE PRODUCTOS LÁCTEOS "DIMA"']],
        // [['Dirección:']],[[`${this.orderAddress}`]],
        // [['Contribuyente Régimen Simplificado:Si']],
        // [['']]
      
      ],
      // columns:[
      //   {header:'Europe',dataKey:'europe'},
      //   {header:'America',dataKey:'america'}
      // ],
      bodyStyles:{fillColor:false,},
      tableWidth:92,margin:{left:14}, startY:35,theme:'plain',tableLineWidth:0.1,tableLineColor:'black'
      
    })
    autoTable(doc,{
      
      // head:[ []],styles:{},
      body:[
        [['']],[['']],[['']],[['']],
        // [['R.U.C :     0702838251001']],
        // [['FACTURA']],[[this.numFactura]],
        // [['Ambiente:     PRODUCCIÓN']],
        // [['Emisión:     NORMAL']]
      ],bodyStyles:{fillColor:false},
      tableWidth:92,margin:{left:110}, startY:35,theme:'plain',tableLineWidth:0.1,tableLineColor:'black'
    
    })
    autoTable(doc,{
      // columnStyles:{0:{textColor:'blue'}},
      // head:[ []],styles:{},
      body:[
        [['']],[['']],[['']]

        // [['Razón social/Nombres y Apellidos:'],['R.U.C :']],
        // [[`${this.nameCustomer}`],[`${this.dniCustomer}`]],
        // [['Fecha de emisión:'],[`${this.fechaFactura}`]]
      ],bodyStyles:{fillColor:false,},
      tableWidth:188,margin:{left:14}, startY:68,theme:'plain',tableLineWidth:0.1,tableLineColor:'black'
      
    })

    autoTable(doc,{html:'#formFactura',theme:'grid',
    body:[
    ],
    headStyles:{fillColor:false,textColor:'black',lineColor:0.1,lineWidth:0.1},
    bodyStyles:{fillColor:false,lineColor:0.1,textColor:'black',fontSize:9},startY:96,tableLineWidth:0.1,tableLineColor:'black'})
   
    autoTable(doc,{html:'#formTotales',theme:'grid',tableLineWidth:0.1,tableLineColor:'black',
    includeHiddenHtml:true,columnStyles:{0:{fontStyle:'bold'}},
    tableWidth:80,margin:{left:122},
    bodyStyles:{fillColor:false,lineColor:0.1,textColor:'black',fontSize:9}
  });
  
    // doc.text('Gracias por su compra!!',80,200)

    doc.save('Prueba.pdf');

  }

}
