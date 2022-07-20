import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProvidersService } from 'src/app/services/providers.service';
import { CreateProviderDTO,Provider } from 'src/app/models/provider.model';
import { Router } from '@angular/router';
import {AlertsService} from '../../../services/alerts.service';


@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {

  provider:Provider={
    id:0,
    name:'',
    ruc:'',
    address:'',
    phone:''
  }

  constructor(
    private providersService:ProvidersService,
    private alertsService:AlertsService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  createProvider(f:NgForm){
    if(!f.valid){
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    }else{
      const dto:CreateProviderDTO={
        name:this.provider.name,
        ruc:this.provider.ruc,
        address:this.provider.address,
        phone:this.provider.phone
      }
      this.providersService.create(dto).subscribe(()=>{
        this.alertsService.alertaSuccessTop('top-end','success','Proveedor creado',false,1500);
        this.router.navigate(['/cms/providers']);
      },(()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','Error al crear proveedor',false,1500);
      }))
    }
  }
}
