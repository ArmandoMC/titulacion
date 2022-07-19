import { Component, OnInit } from '@angular/core';
import { Sugerencias, UpdateSugerenciasDTO } from 'src/app/models/sugerencias.model';
import {MenusService} from '../../../services/menus.service';
@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent implements OnInit {

  sugDespacho:Sugerencias={
    id:0,
    name:'',
    description:'',
    privacidad:'',
    costos_envio:'',
    entregas:'',
    status:''
  };
 
  
  constructor(
    private menusService:MenusService
  ) { }

  ngOnInit(): void {
    this.menusService.getAllSugerencias().subscribe(data=>{
      console.log('sugerencias rescatadas:',data)
      this.sugDespacho=data;
    })
  }

  editarInfo(){
    const dto:UpdateSugerenciasDTO={
      description:this.sugDespacho.description,
      costos_envio:this.sugDespacho.costos_envio,
      entregas:this.sugDespacho.entregas,
      metodo_pago:this.sugDespacho.metodo_pago
    }
    this.menusService.updateSugerencias(this.sugDespacho.id,dto).subscribe(data=>{
      console.log('sugerencias actualziadas:',data)
    })
    
  }

}
