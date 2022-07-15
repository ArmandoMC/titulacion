import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubcategoriesService } from 'src/app/services/subcategories.service';
import {CreateSubCategoryDTO,SubCategory} from '../../../models/category.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {

  @ViewChild('addForm') addForm: NgForm;
  subcategory:SubCategory={
    id:0,
    name:'',
    description:''
  }
  idSubcategory:number=0;

  constructor(
    private subcategoriesService:SubcategoriesService,
    private router:Router

  ) { }

  ngOnInit(): void {
  }

  createSubcategory(f: NgForm) {
    if (!f.valid) {
    } else {
      const dto: CreateSubCategoryDTO = {
        name: this.subcategory.name,
        description: this.subcategory.description,
      };
      this.subcategoriesService.create(dto).subscribe((data) => {
        console.log('subcategoria creada:', data);
        this.addForm.resetForm();
        this.router.navigate(['/cms/subcategories']);
      });
    }
  }
}
