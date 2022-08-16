import { Component ,OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {TokenService} from './services/token.service';


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

