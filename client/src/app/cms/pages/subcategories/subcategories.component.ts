import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SubcategoriesService} from '../../../services/subcategories.service';
import {CreateSubCategoryDTO,SubCategory} from '../../../models/category.model';
import jsPDF from 'jspdf';
import  autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {

  
  subcategories:SubCategory[]=[];
  filterSubcategory:string="";
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;
  constructor(
    private subcategoriesService:SubcategoriesService
  ) { }

  ngOnInit(): void {
    this.subcategoriesService.getAll().subscribe(data=>{
      this.subcategories=data;
    });
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
    this.subcategories.forEach((element,index)=>{
      let temp=[index+1,element.name,element.description];
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
    doc.text('E-mail: lacteosdima@gmail.com',85,40);
    autoTable(doc,{margin:{top:40}});
    autoTable(doc,{head:[['REPORTE DE SUBCATEGORÍAS']],styles:{halign:'center',minCellHeight:10,cellPadding:3,
    fillColor:'#159983'}})

    autoTable(doc,{theme:'plain',tableLineWidth:0.1,tableLineColor:'black',
      head:[['#','Nombre','Descripción']],
      headStyles:{fillColor:'#159983',textColor:'white',lineColor:0.1,lineWidth:0.1},
      body:rows,bodyStyles:{fillColor:false,textColor:'black',lineColor:0.1,lineWidth:0.1}
    })
    doc.save('Reporte de subcategorias');

  }
}
