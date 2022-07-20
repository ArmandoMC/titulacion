import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { CreateProviderDTO,Provider } from 'src/app/models/provider.model';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit {

  editProvider:Provider={
    id:0,
    name:'',
    ruc:'',
    address:'',
    phone:''
  }
  providerId:number=0;
  isDisabled:boolean;
  constructor(
    private providersService:ProvidersService,
    private alertsService:AlertsService,
    private route:ActivatedRoute,
    private router:Router,

  ) { this.isDisabled=true;}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap((params) => {
        this.providerId = Number(params.get('id'));
        if (this.providerId) {
          return this.providersService.get(this.providerId);
        }
        return [null];
      })
    )
    .subscribe((data) => {
      if(data){
        this.editProvider.name=data.name;
        this.editProvider.ruc=data.ruc;
        this.editProvider.address=data.address;
        this.editProvider.phone=data.phone;
      }
    });
  }

  editarProvider(f:NgForm){
    if(!f.valid){
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    }else{
      const dto:CreateProviderDTO={
        name:this.editProvider.name,
        ruc:this.editProvider.ruc,
        address:this.editProvider.address,
        phone:this.editProvider.phone
      }
      this.providersService.update(this.providerId,dto).subscribe(()=>{
        this.alertsService.alertaSuccessTop('top-end','success','Proveedor modificado',false,1500);
        this.router.navigate(['/cms/providers']);
      },(()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','Error al editar proveedor',false,1500);
      }))
    }

  }
  delete(){
    this.alertsService.alertaDelete('Estas seguro?','No podrás revertir los cambios','warning',true,'#3085d6',
    '#d33','Si, eliminar').then((result) => {
      if (result.isConfirmed) {
        this.providersService.delete(this.providerId).subscribe(()=>{
          this.alertsService.alertaSuccessTop('top-end','success','Proveedor eliminado',false,1500);
          this.router.navigate(['/cms/providers']);
        });
      }
    });
  }
  habilitar(){
    this.isDisabled=false;
  }
}
