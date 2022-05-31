import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

export interface Carrito{
  products:Product[],
  quantity:number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: Product[] = [];
  cartTotal = 0;
  numProducts=0;
  private productAddedSource = new Subject<Carrito>();


  productAdded$ = this.productAddedSource.asObservable();

  constructor() { 
    this.productAddedSource.next()
  }

  addProductToCart(product:Product) {
    let exists = false;
    // const parsedPrice = parseFloat(product.price.replace(/\./g, '').replace(',', '.'));
    this.cartTotal += product.price;
    // Search this product on the cart and increment the quantity
    this.products = this.products.map(_product => {
      if (_product.id === product.id) {
        const indice=this.products.findIndex(p=>p.id===product.id)
        this.numProducts = this.products.reduce((acc, product) => {
          acc += product.oferta;
          return acc;
        }, 0);
        _product.oferta+=this.numProducts;
        exists = true;
      }
      return _product;
    });
    // Add a new product to the cart if it's a new product
    if (!exists) {
      product.oferta=1;
      // product.parsedPrice = parsedPrice;
      this.products.push(product);
    }

    this.productAddedSource.next({ products: this.products, quantity: this.cartTotal });
  }

  // deleteProductFromCart(product:any) {
  //   this.products = this.products.filter(_product => {
  //     if (_product.product.id === product.id) {
  //       this.cartTotal -= _product.product.parsedPrice * _product.quantity;
  //       return false;
  //     }
  //     return true;
  //    });
  //   this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  // }


  // flushCart() {
  //   this.products = [];
  //   this.cartTotal = 0;
  //   this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  // }
}
