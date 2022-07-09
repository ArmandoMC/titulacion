import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import {CreateCategoryDTO,CreateSubCategoryDTO,SubCategory} from '../../../models/category.model';
import {CreateBrandDTO,Brand} from '../../../models/brand.model';
import {BrandService} from '../../../services/brand.service';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  @ViewChild('addForm') addForm: NgForm;
  @ViewChild('editForm')editForm:NgForm;
  @ViewChild('botonCerrarAdd') botonCerrarAdd: ElementRef;
  @ViewChild('botonCerrarEdit')botonCerrarEdit:ElementRef;
  brands:Brand[]=[];
  brand:Brand={
    id:0,
    name:'',
    description:''
  }
  editBrand:Brand={
    id:0,
    name:'',
    description:''
  }
  idBrand:number=0;
  filterBrand:string="";

  constructor(
    private brandService:BrandService
  ) { }

  ngOnInit(): void {
    this.brandService.getAll().subscribe();
    this.brandService.brands$.subscribe(data=>{
      console.log(data)
      this.brands=data;
    })
  }

  createBrand(f:NgForm){
    if(!f.valid){

    }else{
      const dto:CreateBrandDTO={
        name:this.brand.name,
        description:this.brand.description
      }
      this.brandService.create(dto).subscribe(data=>{
        console.log('categoria creada:',data)
        this.addForm.resetForm();
        this.cerrarModalAdd();
      })
    }
  }
  edit(id:number){
    const item = this.brands.find((item) => item.id === id);
    if (item) {
      this.idBrand = item.id;
      this.editBrand.name=item.name;
      this.editBrand.description=item.description;
    }

  }
  editarBrand(f:NgForm){
    if(!f.valid){

    }else{
      const dto:CreateBrandDTO={
        name:this.editBrand.name,
        description:this.editBrand.description
      }
      this.brandService.update(this.idBrand,dto).subscribe(data=>{
        console.log('marca editada:',data)
        this.editForm.resetForm();
        this.cerrarModalEdit();
      })
    }

  }
  deleteBrand(id:number){
    this.brandService.delete(id).subscribe(data=>{
      console.log('marca eliminada',data);
    })
    const indice=this.brands.findIndex(cat=>cat.id===id);
    if(indice!=-1){
      this.brands.splice(indice,1);
    }
  }
  cerrarModalAdd(){
    this.botonCerrarAdd.nativeElement.click();
  }
  cerrarModalEdit(){
    this.botonCerrarEdit.nativeElement.click();
  }
}
