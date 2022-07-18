import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import {MenusService} from '../../../services/menus.service';
@Component({
  selector: 'app-menu-nosotros',
  templateUrl: './menu-nosotros.component.html',
  styleUrls: ['./menu-nosotros.component.css']
})
export class MenuNosotrosComponent implements OnInit {

  menus:Menu[]=[];
  // menu:Menu={
  //   id:0,
  //   name:'',
  //   decription:'',
  //   mision:'',
  //   vision:'',
  //   status:'',
  // }
  constructor(
    private menusService:MenusService
  ) { }

  ngOnInit(): void {
    this.menusService.getAll().subscribe(data=>{
      console.log('menus rescatados: ',data)
      this.menus=data;
    })
  }

}
