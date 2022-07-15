import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category, CreateCategoryDTO } from 'src/app/models/category.model';
import {CategoriesService} from '../../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  @ViewChild('addForm') addForm: NgForm;

  category: Category = {
    id: 0,
    name: '',
    description: '',
  };
  
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  createCategory(f: NgForm) {
    if (!f.valid) {
    } else {
      const dto: CreateCategoryDTO = {
        name: this.category.name,
        description: this.category.description,
      };
      this.categoriesService.create(dto).subscribe((data) => {
        console.log('categoria creada:', data);
        this.router.navigate(['/cms/categories']);
      });
    }
  }
}
