import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CreateOrderDTO, Order, UpdateOrderDTO } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private API='http://localhost:3000/api';

  constructor(
    private http:HttpClient

  ) { 
  }

  getOrderDetail(id: string): Observable<any> {
    return this.http.get(`${this.API}/orders/${id}`)
  }

  sendPayment(token: string, id: number):Observable<any> {
    return this.http.put<any>(`${this.API}/orders/${id}`,{token});
  }


  generateOrder(data:CreateOrderDTO) {
    return this.http.post<Order>(`${this.API}/orders`, data)
  }

  confirmOrder(id:number,dto:UpdateOrderDTO) {
    return this.http.put<Order>(`${this.API}/orders/confirm/${id}`,dto);
  }
}
