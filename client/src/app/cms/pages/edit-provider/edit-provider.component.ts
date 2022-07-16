import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers.service';
import { CreateProviderDTO,Provider } from 'src/app/models/provider.model';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit {

  @ViewChild('editForm')editForm:NgForm;

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

    }else{
      const dto:CreateProviderDTO={
        name:this.editProvider.name,
        ruc:this.editProvider.ruc,
        address:this.editProvider.address,
        phone:this.editProvider.phone
      }
      this.providersService.update(this.providerId,dto).subscribe(data=>{
        console.log('proveedor editado:',data);
        this.editForm.resetForm();
        this.router.navigate(['/cms/providers']);
      })
    }

  }
  delete(){
    this.providersService.delete(this.providerId).subscribe(data=>{
      console.log('proveedor eliminado',data);
      this.router.navigate(['/cms/providers']);

    });
  }
  habilitar(){
    this.isDisabled=false;
  }
}
