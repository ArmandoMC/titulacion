import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {CreateBrandDTO,Brand} from '../../../models/brand.model';
import {BrandService} from '../../../services/brand.service';
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  @ViewChild('addForm') addForm: NgForm;

  brand:Brand={
    id:0,
    name:'',
    description:''
  }
  idBrand:number=0;

  constructor(
    private brandService:BrandService,
    private router:Router,

  ) { }

  ngOnInit(): void {
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
        this.router.navigate(['/cms/brands']);
      })
    }
  }

}
