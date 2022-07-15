import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  
  categories: Category[] = [];
  
  constructor(private categoriesService: CategoriesService) {}

  filterCategory: string = '';
  ngOnInit(): void {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
}
