import { Component, Output ,OnInit} from '@angular/core';
import { Product } from './models/product.model';
import {AuthService} from './services/auth.service';
import {TokenService} from './services/token.service';

import {StoreService} from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  imgParent = '';
  showImg=true;
 
  constructor(
    private authService:AuthService,
    private tokenService:TokenService,
    private storeService:StoreService

  ){

  }

  ngOnInit(): void {
    const token=this.tokenService.getToken();
    // const user=this.tokenService.getUser();
    if(token){
      this.authService.getProfile()
      .subscribe()
    }
    // const carrito=this.tokenService.getCarrito();

    // if(carrito){
    //   this.storeService.obtenerCarrito();
    // }
  }

  onLoaded(img:string){
    console.log('log padre', img);
  }

  toggleImg(){
    this.showImg=!this.showImg;
  }
}

