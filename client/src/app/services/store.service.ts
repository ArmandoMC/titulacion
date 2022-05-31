import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { repeat } from 'rxjs/operators';
import { Auth } from '../models/auth.model';
import { Product } from '../models/product.model';
import { ProductComponent } from '../shared/components/product/product.component';

@Injectable({ providedIn: 'root' })
export class StoreService {
  // private currentUserSubject: BehaviorSubject<Auth> = new BehaviorSubject<Auth>({ user: {}, token: '' } as Auth);
  // public readonly currentUser$: Observable<Auth> = this.currentUserSubject.asObservable();

  private myShoppingCart: Product[] = this.obtener();
  private my: any[] = this.obtener();
  private cantidadProductos = 0;
  // private myShoppingCartSinDuplicados: Product[] = [];

  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  total = 0;

  constructor() {
    this.verificarSesionCart();
  }
    
  // setCurrentUser(currentUser: Auth) {
  //   this.currentUserSubject.next(currentUser);
  // }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  addProduct(product: Product) {
   
    let indice = this.myShoppingCart.findIndex((p) => p.id == product.id);
    if (indice == -1) {
      this.myShoppingCart.push(product);
      console.log('producto añadido')
    } else {
      console.log('indice encontrado')
      this.myShoppingCart[indice].oferta=product.oferta;
    }
    this.myShoppingCart.map(element=>{
      element.subtotal=element.oferta*element.price;
    })

    this.myCart.next(this.myShoppingCart);
    this.guardar();
  }
  verificarSesionCart(){
    let carrito=localStorage.getItem('carrito');
    if(carrito){
      this.myCart.next(JSON.parse(carrito));
    }
  }
  eliminar(id:string){
    let indice = this.myShoppingCart.findIndex((p) => p.id == id);
    if(indice!=-1){
      this.myShoppingCart.splice(indice,1);
      this.myCart.next(this.myShoppingCart);
      this.guardar();
    }
  }
  obtener(){
    const productosCodificados=localStorage.getItem('carrito');
    if(productosCodificados){
      let pro:Product[]=JSON.parse(productosCodificados) ;

      return (pro)||[] as Product[];

    }else{
      return [] as Product[];
    }
  }
guardar(){
  localStorage.setItem('carrito',JSON.stringify(this.myShoppingCart))
}
  getTotal() {
    return (this.total = this.myShoppingCart.reduce(
      (sum, item) => sum + item.price * item.oferta,
      0
    ));
  }
  // getCantidadtotal() {
  //   return (this.cantidadProductos = this.myShoppingCart.reduce(
  //     (sum, item) => sum + item.oferta,
  //     0
  //   ));
  // }
}
