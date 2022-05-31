import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(

  ) { }
  
  getToken() {
    const token=localStorage.getItem('token');
    return token;
  }
  getCarrito(){
    const cart=localStorage.getItem('carrito');
    return cart;
  }

  removeToken(){
    localStorage.removeItem('token');
  }
  
}
