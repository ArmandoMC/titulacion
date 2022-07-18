import { Component, OnInit } from '@angular/core';
import { Sugerencias } from 'src/app/models/sugerencias.model';
import {MenusService} from '../../../services/menus.service';
@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent implements OnInit {

  sugerencias:Sugerencias[]=[];
  constructor(
    private menusService:MenusService
  ) { }

  ngOnInit(): void {
    this.menusService.getAllSugerencias().subscribe(data=>{
      console.log('sugerencias rescatadas:',data)
      this.sugerencias=data;
    })
  }
  verCondicionesDespacho(){
    
  }

}
