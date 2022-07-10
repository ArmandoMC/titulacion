import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from '../../../services/categories.service';
import { CreateCategoryDTO } from '../../../models/category.model';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild('addForm') addForm: NgForm;
  @ViewChild('editForm') editForm: NgForm;
  @ViewChild('botonCerrarAdd') botonCerrarAdd: ElementRef;
  @ViewChild('botonCerrarEdit') botonCerrarEdit: ElementRef;
  categories: Category[] = [];
  category: Category = {
    id: 0,
    name: '',
    description: '',
  };
  editCategory: Category = {
    id: 0,
    name: '',
    description: '',
  };
  idCategory: number = 0;
  constructor(private categoriesService: CategoriesService) {}

  filterCategory: string = '';
  ngOnInit(): void {
    this.categoriesService.getAll().subscribe();
    this.categoriesService.categories$.subscribe((data) => {
      this.categories = data;
    });
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
        this.addForm.resetForm();
        this.cerrarModalAdd();
      });
    }
  }
  edit(id: number) {
    const item = this.categories.find((item) => item.id === id);
    if (item) {
      this.idCategory = item.id;
      this.editCategory.name = item.name;
      this.editCategory.description = item.description;
    }
  }
  editarCategory(f: NgForm) {
    if (!f.valid) {
    } else {
      const dto: CreateCategoryDTO = {
        name: this.editCategory.name,
        description: this.editCategory.description,
      };
      this.categoriesService.update(this.idCategory, dto).subscribe((data) => {
        console.log('categoria editada:', data);
        this.editForm.resetForm();
        this.cerrarModalEdit();
      });
    }
  }
  deleteCategory(id: number) {
    this.categoriesService.delete(id).subscribe((data) => {
      console.log('categoria eliminada', data);
    });
    const indice = this.categories.findIndex((cat) => cat.id === id);
    if (indice != -1) {
      this.categories.splice(indice, 1);
    }
  }
  cerrarModalAdd() {
    this.botonCerrarAdd.nativeElement.click();
  }
  cerrarModalEdit() {
    this.botonCerrarEdit.nativeElement.click();
  }
}
