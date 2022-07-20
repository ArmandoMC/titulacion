import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { AlertsService } from '../../../services/alerts.service';
import { CreateCategoryDTO, Category } from '../../../models/category.model';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {

  editCategory: Category = {
    id: 0,
    name: '',
    description: '',
  };
  categoryId: number = 0;
  isDisabled:boolean;

  constructor(
    private categoriesService: CategoriesService,
    private alertsService: AlertsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isDisabled = true;
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = Number(params.get('id'));
          if (this.categoryId) {
            return this.categoriesService.get(this.categoryId);
          }
          return [null];
        })
      )
      .subscribe((data) => {
        if (data) {
          this.editCategory.name = data.name;
          this.editCategory.description = data.description;
        }
      });
  }

  editarCategory(f: NgForm) {
    if (!f.valid) {
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    } else {
      const dto: CreateCategoryDTO = {
        name: this.editCategory.name,
        description: this.editCategory.description,
      };
      this.categoriesService.update(this.categoryId, dto).subscribe(() => {
        this.alertsService.alertaSuccessTop('top-end','success','Categoría modificada',false,1500);
        this.router.navigate(['/cms/categories']);
      },(()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','Error al editar categoría',false,1500);
      }));
    }
  }
  deleteCategory() {
    this.alertsService.alertaDelete('Estas seguro?','No podrás revertir los cambios','warning',true,'#3085d6',
    '#d33','Si, eliminar').then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.delete(this.categoryId).subscribe((data) => {
          this.alertsService.alertaSuccessTop('top-end','success','Categoría eliminada',false,1500);
          this.router.navigate(['/cms/categories']);
        });
      }
    });
  }
  habilitar(){
    this.isDisabled=false;
  }
}
