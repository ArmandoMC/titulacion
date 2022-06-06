import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateOrderDTO, Order } from '../models/order.model';
import { Product } from '../models/product.model';
import {HttpClient} from '@angular/common/http';

export interface Carrito{
  products:Product[],
  quantity:number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderId:number=0;
  private myOrderId = new BehaviorSubject<number>(0);
  myOrderId$ = this.myOrderId.asObservable();
  private API='http://localhost:3000/api';

  constructor(
    private http:HttpClient
  ) { 
  }

  

  generateOrder(data:CreateOrderDTO) {
    return this.http.post<Order>(`${this.API}/orders`, data)
    .pipe(
      tap((order)=>{
        this.myOrderId.next(order.id);
      })
    )
  }

 
}
