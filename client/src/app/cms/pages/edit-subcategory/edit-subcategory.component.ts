import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateSubCategoryDTO, SubCategory } from 'src/app/models/category.model';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { SubcategoriesService } from 'src/app/services/subcategories.service';

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
    } else {
      const dto: CreateSubCategoryDTO = {
        name: this.editSubcategory.name,
        description: this.editSubcategory.description,
      };
      this.subcategoriesService.update(this.subcategoryId, dto).subscribe((data) => {
        console.log('subcategoria editada:', data);
        this.router.navigate(['/cms/subcategories']);
      });
    }
  }
  delete() {
    this.subcategoriesService.delete(this.subcategoryId).subscribe((data) => {
      console.log('subcategoria eliminada', data);
      this.router.navigate(['/cms/subcategories']);
    });
   
  }
  habilitar(){
    this.isDisabled=false;
  }
}
