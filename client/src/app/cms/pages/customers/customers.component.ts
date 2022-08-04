import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import jsPDF from 'jspdf';
import  autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers:any[]=[];
  filterCustomer:string="";
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;
  constructor(
    private customerService:CustomerService,
  ) { }

  ngOnInit(): void {

  
    this.customerService.getAll().subscribe(data=>{
      this.customers=data;

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
  imprimir(){
    const doc = new jsPDF('p','mm','letter');
    let rows=[];
    this.customers.forEach((element,index)=>{
      let temp=[index+1,element.dni,element.name,element.last_name,element.email,element.phone];
      rows.push(temp);
    })
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
    autoTable(doc,{head:[['REPORTE DE CLIENTES']],styles:{halign:'center',minCellHeight:10,cellPadding:3,
    fillColor:'#159983'}})

    autoTable(doc,{
      head:[['#','Cédula','Nombres','Apellidos','E-mail','Teléfono']],
      styles:{fillColor:'#159983'},
      body:rows,bodyStyles:{fillColor:false,lineWidth:0.1}
    })
    doc.save('Reporte de clientes');

  }
}
