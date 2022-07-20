import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {CreateBrandDTO,Brand} from '../../../models/brand.model';
import {BrandService} from '../../../services/brand.service';
import {AlertsService} from '../../../services/alerts.service';
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
    private alertsService:AlertsService,
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
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    }else{
      const dto:CreateBrandDTO={
        name:this.editBrand.name,
        description:this.editBrand.description
      }
      this.brandService.update(this.brandId,dto).subscribe(()=>{
        this.alertsService.alertaSuccessTop('top-end','success','Marca modificada',false,1500);
        this.router.navigate(['/cms/brands']);
      },(()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','Error al editar marca',false,1500);
      }))
    }

  }
  delete(){
    this.alertsService.alertaDelete('Estas seguro?','No podrás revertir los cambios','warning',true,'#3085d6',
    '#d33','Si, eliminar').then((result) => {
      if (result.isConfirmed) {
        this.brandService.delete(this.brandId).subscribe(()=>{
          this.alertsService.alertaSuccessTop('top-end','success','Marca eliminada',false,1500);
          this.router.navigate(['/cms/brands']);
        });
      }
    });
  }
  habilitar(){
    this.isDisabled=false;
  }

}
