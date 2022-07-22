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
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;

  constructor(private categoriesService: CategoriesService) {}

  filterCategory: string = '';
  ngOnInit(): void {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
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
