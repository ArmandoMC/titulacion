import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProvidersService } from 'src/app/services/providers.service';
import { CreateProviderDTO,Provider } from 'src/app/models/provider.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {

  @ViewChild('addForm') addForm: NgForm;
  provider:Provider={
    id:0,
    name:'',
    ruc:'',
    address:'',
    phone:''
  }

  constructor(
    private providersService:ProvidersService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  createProvider(f:NgForm){
    if(!f.valid){

    }else{
      const dto:CreateProviderDTO={
        name:this.provider.name,
        ruc:this.provider.ruc,
        address:this.provider.address,
        phone:this.provider.phone
      }
      this.providersService.create(dto).subscribe(data=>{
        console.log('proveedor creado:',data)
        this.addForm.resetForm();
        this.router.navigate(['/cms/providers']);
      })
    }
  }
}
