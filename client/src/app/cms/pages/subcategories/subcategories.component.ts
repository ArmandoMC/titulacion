import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SubcategoriesService} from '../../../services/subcategories.service';
import {CreateSubCategoryDTO,SubCategory} from '../../../models/category.model';


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
}
