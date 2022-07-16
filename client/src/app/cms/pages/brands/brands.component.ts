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

  constructor(
    private brandService:BrandService
  ) { }

  ngOnInit(): void {
    this.brandService.getAll().subscribe(data=>{
      this.brands=data;

    });
  }
}
