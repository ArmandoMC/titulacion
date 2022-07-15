import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { CreateCategoryDTO, Category } from '../../../models/category.model';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

  editCategory: Category = {
    id: 0,
    name: '',
    description: '',
  };
  categoryId: number = 0;
  isDisabled:boolean;

  constructor(
    private categoriesService: CategoriesService,
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
    } else {
      const dto: CreateCategoryDTO = {
        name: this.editCategory.name,
        description: this.editCategory.description,
      };
      this.categoriesService.update(this.categoryId, dto).subscribe((data) => {
        console.log('categoria editada:', data);
        this.router.navigate(['/cms/categories']);
      });
    }
  }
  deleteCategory() {
    this.categoriesService.delete(this.categoryId).subscribe((data) => {
      console.log('categoria eliminada', data);
      this.router.navigate(['/cms/categories']);
    });
  }
  habilitar(){
    this.isDisabled=false;
  }
}
