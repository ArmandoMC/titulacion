import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category, CreateCategoryDTO } from 'src/app/models/category.model';
import {CategoriesService} from '../../../services/categories.service';
import {AlertsService} from '../../../services/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = {
    id: 0,
    name: '',
    description: '',
  };
  
  constructor(
    private categoriesService: CategoriesService,
    private alertsService: AlertsService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  createCategory(f: NgForm) {
    if (!f.valid) {
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    } else {
      const dto: CreateCategoryDTO = {
        name: this.category.name,
        description: this.category.description,
      };
      this.categoriesService.create(dto).subscribe((data) => {
        this.alertsService.alertaSuccessTop('top-end','success','Categoría creada',false,1500);
        this.router.navigate(['/cms/categories']);
      },(()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','Error al crear categoría',false,1500);
      }));
    }
  }
}
