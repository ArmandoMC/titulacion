import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubcategoriesService } from 'src/app/services/subcategories.service';
import { AlertsService } from 'src/app/services/alerts.service';
import {CreateSubCategoryDTO,SubCategory} from '../../../models/category.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {

  subcategory:SubCategory={
    id:0,
    name:'',
    description:''
  }

  constructor(
    private subcategoriesService:SubcategoriesService,
    private alertsService:AlertsService,
    private router:Router

  ) { }

  ngOnInit(): void {
  }

  createSubcategory(f: NgForm) {
    if (!f.valid) {
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    } else {
      const dto: CreateSubCategoryDTO = {
        name: this.subcategory.name,
        description: this.subcategory.description,
      };
      this.subcategoriesService.create(dto).subscribe(() => {
        this.alertsService.alertaSuccessTop('top-end','success','Subcategoría creada',false,1500);
        this.router.navigate(['/cms/subcategories']);
      },(()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','Error al crear subcategoría',false,1500);
      }));
    }
  }
}
