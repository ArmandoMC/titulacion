import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { Product } from '../../../models/product.model';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent implements OnInit, OnDestroy {
  total = 0;
  cantidadTotal = 0;
  // products: Product[] = [];
  subtotal: number = 0;
  
  private subscriber: Subscription;
  products: Product[] = [];
  numProducts = 0;
  // animatePlop = false;
  // animatePopout = false;
  // expanded = false;
  // expandedHeight: string;
  cartTotal = 0;
  inherit: string;
  idProducto='';
  logueado:boolean;
  constructor(
    private storeService: StoreService,
    private cartService:CartService,
    private authService:AuthService,
    private tokenService:TokenService
    ) 
    {
      this.logueado=false;
    }

  ngOnInit(): void {

     this.storeService.myCart$.subscribe((data) => {
      this.products=data;
    });
    
    const token=this.tokenService.getToken();
    if(token){
      this.logueado=true;
    }else{
      this.logueado=false;
    }
  }
  ngOnDestroy(): void {
    console.log('destruido');
    // this.subscriber.unsubscribe();
  }
  eliminarProducto(productId:string) {
    // this.products.sort((a, b) => Number('' + a.id) - Number('' + b.id));
  
    this.storeService.eliminar(productId);
    console.log('eliminado');
  }  
}
