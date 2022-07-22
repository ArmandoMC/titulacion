import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import {CreateCategoryDTO,CreateSubCategoryDTO,SubCategory} from '../../../models/category.model';
import {CreateBrandDTO,Brand} from '../../../models/brand.model';
import {BrandService} from '../../../services/brand.service';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  @ViewChild('addForm') addForm: NgForm;

  brands:Brand[]=[];
  filterBrand:string="";
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;

  constructor(
    private brandService:BrandService
  ) { }

  ngOnInit(): void {
    this.brandService.getAll().subscribe(data=>{
      this.brands=data;

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
