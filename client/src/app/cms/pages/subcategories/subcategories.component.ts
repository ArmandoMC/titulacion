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

  constructor(
    private subcategoriesService:SubcategoriesService
  ) { }

  ngOnInit(): void {
    this.subcategoriesService.getAll().subscribe(data=>{
      this.subcategories=data;
    });
  }
}
