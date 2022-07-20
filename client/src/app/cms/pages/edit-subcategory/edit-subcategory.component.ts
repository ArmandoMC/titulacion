import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateSubCategoryDTO, SubCategory } from 'src/app/models/category.model';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { SubcategoriesService } from 'src/app/services/subcategories.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.css']
})
export class EditSubcategoryComponent implements OnInit {

  editSubcategory:SubCategory={
    id:0,
    name:'',
    description:''
  }
  subcategoryId:number;
  isDisabled:boolean;

  constructor(
    private subcategoriesService:SubcategoriesService,
    private alertsService:AlertsService,
    private route: ActivatedRoute,
    private router: Router,


  ) { 
    this.isDisabled=true;
  }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap((params) => {
        this.subcategoryId = Number(params.get('id'));
        if (this.subcategoryId) {
          return this.subcategoriesService.get(this.subcategoryId);
        }
        return [null];
      })
    )
    .subscribe((data) => {
      if(data){
        this.editSubcategory.name=data.name;
        this.editSubcategory.description=data.description;
      }
    })
  }

  editarSubcategory(f: NgForm) {
    if (!f.valid) {
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    } else {
      const dto: CreateSubCategoryDTO = {
        name: this.editSubcategory.name,
        description: this.editSubcategory.description,
      };
      this.subcategoriesService.update(this.subcategoryId, dto).subscribe(() => {
        this.alertsService.alertaSuccessTop('top-end','success','Subcategoría modificada',false,1500);
        this.router.navigate(['/cms/subcategories']);
      },(()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','Error al modificar subcategoría',false,1500);
      }));
    }
  }
  delete() {
    this.alertsService.alertaDelete('Estas seguro?','No podrás revertir los cambios','warning',true,'#3085d6',
    '#d33','Si, eliminar').then((result) => {
      if (result.isConfirmed) {
        this.subcategoriesService.delete(this.subcategoryId).subscribe(() => {
          this.alertsService.alertaSuccessTop('top-end','success','Subcategoría eliminada',false,1500);
          this.router.navigate(['/cms/subcategories']);
        });
      }
    });
   
  }
  habilitar(){
    this.isDisabled=false;
  }
}
