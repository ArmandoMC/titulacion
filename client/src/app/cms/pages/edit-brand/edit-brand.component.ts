import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {CreateBrandDTO,Brand} from '../../../models/brand.model';
import {BrandService} from '../../../services/brand.service';
import {switchMap} from 'rxjs/operators';
@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
  brandId:number;
  editBrand:Brand={
    id:0,
    name:'',
    description:''
  }
  isDisabled:boolean;

  constructor(
    private brandService:BrandService,
    private router: Router,
    private route: ActivatedRoute

  ) { this.isDisabled=true; }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap((params) => {
        this.brandId = Number(params.get('id'));
        if (this.brandId) {
          return this.brandService.get(this.brandId);
        }
        return [null];
      })
    )
    .subscribe((data) => {
      if(data){
        this.editBrand.name=data.name;
        this.editBrand.description=data.description;
      }
    })
  }

  editarBrand(f:NgForm){
    if(!f.valid){

    }else{
      const dto:CreateBrandDTO={
        name:this.editBrand.name,
        description:this.editBrand.description
      }
      this.brandService.update(this.brandId,dto).subscribe(data=>{
        console.log('marca editada:',data);
        this.router.navigate(['/cms/brands']);
        
      })
    }

  }
  delete(){
    this.brandService.delete(this.brandId).subscribe(data=>{
      console.log('marca eliminada',data);
      this.router.navigate(['/cms/brands']);
    })
  }
  habilitar(){
    this.isDisabled=false;
  }

}
