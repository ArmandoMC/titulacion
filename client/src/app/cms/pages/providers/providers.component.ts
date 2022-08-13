import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProvidersService } from 'src/app/services/providers.service';
import { Provider } from 'src/app/models/provider.model';
import jsPDF from 'jspdf';
import  autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
})
export class ProvidersComponent implements OnInit {
  providers: Provider[] = [];

  filterProvider: string = '';
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;

  constructor(private providersService: ProvidersService) {}

  ngOnInit(): void {
    this.providersService.getAll().subscribe((data) => {
      this.providers = data;
      console.log(this.providers)
    });
  }
  nextPage() {
    this.page += 4;
    this.numPagina += 1;
  }

  prevPage() {
    if (this.page > 0) 
    this.page -= 4;
    if (this.numPagina > 1) {
      this.numPagina -= 1;
    }
  }

  onSearch(search: string) {
    this.page = 0;
    this.search = search;
  }
  imprimir(){
    const doc = new jsPDF('p','mm','letter');
    let rows=[];
    this.providers.forEach((element,index)=>{
      let temp=[index+1,element.ruc,element.name,element.phone,element.address];
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
    autoTable(doc,{head:[['REPORTE DE PROVEEDORES']],styles:{halign:'center',minCellHeight:10,cellPadding:3,
    fillColor:'#159983'}})

    autoTable(doc,{theme:'plain',tableLineWidth:0.1,tableLineColor:'black',
      head:[['#','Ruc','Nombre','Teléfono','Dirección']],
      headStyles:{fillColor:'#159983',textColor:'white',lineColor:0.1,lineWidth:0.1},
      body:rows,bodyStyles:{fillColor:false,textColor:'black',lineColor:0.1,lineWidth:0.1}
    })
    doc.save('Reporte de proveedores');

  }
}
