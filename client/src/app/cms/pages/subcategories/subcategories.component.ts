import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SubcategoriesService} from '../../../services/subcategories.service';
import {CreateSubCategoryDTO,SubCategory} from '../../../models/category.model';


@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {

  @ViewChild('addForm') addForm: NgForm;
  @ViewChild('editForm')editForm:NgForm;
  @ViewChild('botonCerrarAdd') botonCerrarAdd: ElementRef;
  @ViewChild('botonCerrarEdit')botonCerrarEdit:ElementRef;
  subcategories:SubCategory[]=[];
  subcategory:SubCategory={
    id:0,
    name:'',
    description:''
  }
  editSubcategory:SubCategory={
    id:0,
    name:'',
    description:''
  }
  idSubcategory:number=0;
  filterSubcategory:string="";

  constructor(
    private subcategoriesService:SubcategoriesService
  ) { }

  ngOnInit(): void {
    this.subcategoriesService.getAll().subscribe();
    this.subcategoriesService.subcategories$.subscribe(data=>{
      this.subcategories=data;
    })
  }

  createSubcategory(f: NgForm) {
    if (!f.valid) {
    } else {
      const dto: CreateSubCategoryDTO = {
        name: this.subcategory.name,
        description: this.subcategory.description,
      };
      this.subcategoriesService.create(dto).subscribe((data) => {
        console.log('subcategoria creada:', data);
        this.addForm.resetForm();
        this.cerrarModalAdd();
      });
    }
  }
  edit(id: number) {
    const item = this.subcategories.find((item) => item.id === id);
    if (item) {
      this.idSubcategory = item.id;
      this.editSubcategory.name = item.name;
      this.editSubcategory.description = item.description;
    }
  }
  editarSubcategory(f: NgForm) {
    if (!f.valid) {
    } else {
      const dto: CreateSubCategoryDTO = {
        name: this.editSubcategory.name,
        description: this.editSubcategory.description,
      };
      this.subcategoriesService.update(this.idSubcategory, dto).subscribe((data) => {
        console.log('subcategoria editada:', data);
        this.editForm.resetForm();
        this.cerrarModalEdit();
      });
    }
  }
  delete(id: number) {
    this.subcategoriesService.delete(id).subscribe((data) => {
      console.log('subcategoria eliminada', data);
    });
    const indice = this.subcategories.findIndex((cat) => cat.id === id);
    if (indice != -1) {
      this.subcategories.splice(indice, 1);
    }
  }
  cerrarModalAdd() {
    this.botonCerrarAdd.nativeElement.click();
  }
  cerrarModalEdit() {
    this.botonCerrarEdit.nativeElement.click();
  }
}
