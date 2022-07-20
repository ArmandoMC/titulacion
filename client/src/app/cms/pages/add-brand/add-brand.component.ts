import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {CreateBrandDTO,Brand} from '../../../models/brand.model';
import {BrandService} from '../../../services/brand.service';
import {AlertsService} from '../../../services/alerts.service';
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  brand:Brand={
    id:0,
    name:'',
    description:''
  }
  idBrand:number=0;

  constructor(
    private brandService:BrandService,
    private alertsService:AlertsService,
    private router:Router,

  ) { }

  ngOnInit(): void {
  }

  createBrand(f:NgForm){
    if(!f.valid){
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    }else{
      const dto:CreateBrandDTO={
        name:this.brand.name,
        description:this.brand.description
      }
      this.brandService.create(dto).subscribe(()=>{
        this.alertsService.alertaSuccessTop('top-end','success','Marca agregada',false,1500);
        this.router.navigate(['/cms/brands']);
      },(()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','Error al crear marca',false,1500);
      }))
    }
  }

}
