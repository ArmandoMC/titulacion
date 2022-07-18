import { Component, OnInit } from '@angular/core';
import { Menu,CreateMenuNosotrosDTO ,UpdateMenuNosotrosDTO} from 'src/app/models/menu.model';
import {MenusService} from '../../../services/menus.service';
@Component({
  selector: 'app-menu-nosotros',
  templateUrl: './menu-nosotros.component.html',
  styleUrls: ['./menu-nosotros.component.css']
})
export class MenuNosotrosComponent implements OnInit {

  menus:Menu[]=[];
  menu:Menu={
    id:0,
    name:'',
    description:'',
    mision:'',
    vision:'',
    status:''
  };
  constructor(
    private menusService:MenusService
  ) { }

  ngOnInit(): void {
    this.menusService.getAll().subscribe(data=>{
      this.menus=data;
      this.menus.forEach(item=>{
        if(item.name=='Nosotros'){
          this.menu=item;
        }
      })
    })
  }
  editarInfo(){
    const dto:UpdateMenuNosotrosDTO={
      description:this.menu.description,
      mision:this.menu.mision,
      vision:this.menu.vision
    }
    this.menusService.update(this.menu.id,dto).subscribe(data=>{
      console.log('menu nosotrso actualizado:',data)
    })
  }

}
