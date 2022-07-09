import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from 'src/app/models/brand.model';
import { ProvidersService } from 'src/app/services/providers.service';
import { CreateProviderDTO,Provider } from 'src/app/models/provider.model';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  @ViewChild('addForm') addForm: NgForm;
  @ViewChild('editForm')editForm:NgForm;
  @ViewChild('botonCerrarAdd') botonCerrarAdd: ElementRef;
  @ViewChild('botonCerrarEdit')botonCerrarEdit:ElementRef;
  providers:Provider[]=[];
  provider:Provider={
    id:0,
    name:'',
    ruc:''
  }
  editProvider:Provider={
    id:0,
    name:'',
    ruc:''
  }
  idProvider:number=0;
  filterProvider:string="";
  constructor(
    private providersService:ProvidersService

  ) { }

  ngOnInit(): void {
    this.providersService.getAll().subscribe();
    this.providersService.providers$.subscribe(data=>{
      this.providers=data;
    })
  }

  
  createProvider(f:NgForm){
    if(!f.valid){

    }else{
      const dto:CreateProviderDTO={
        name:this.provider.name,
        ruc:this.provider.ruc
      }
      this.providersService.create(dto).subscribe(data=>{
        console.log('proveedor creado:',data)
        this.addForm.resetForm();
        this.cerrarModalAdd();
      })
    }
  }
  edit(id:number){
    const item = this.providers.find((item) => item.id === id);
    if (item) {
      this.idProvider = item.id;
      this.editProvider.name=item.name;
      this.editProvider.ruc=item.ruc;
    }

  }
  editarProvider(f:NgForm){
    if(!f.valid){

    }else{
      const dto:CreateProviderDTO={
        name:this.editProvider.name,
        ruc:this.editProvider.ruc
      }
      this.providersService.update(this.idProvider,dto).subscribe(data=>{
        console.log('proveedor editado:',data)
        this.editForm.resetForm();
        this.cerrarModalEdit();
      })
    }

  }
  deleteProvider(id:number){
    this.providersService.delete(id).subscribe(data=>{
      console.log('proveedor eliminado',data);
    })
    const indice=this.providers.findIndex(cat=>cat.id===id);
    if(indice!=-1){
      this.providers.splice(indice,1);
    }
  }
  cerrarModalAdd(){
    this.botonCerrarAdd.nativeElement.click();
  }
  cerrarModalEdit(){
    this.botonCerrarEdit.nativeElement.click();
  }

}
