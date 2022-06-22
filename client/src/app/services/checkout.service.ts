import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CreateOrderDTO, OrderPayment, UpdateOrderDTO } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private API='http://localhost:3000/api';

  constructor(
    private http:HttpClient

  ) { 
  }

  getOrderByCustomer(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/orders/customer/${id}`)
  }
  getAddressByOrderId(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/orders/address/${id}`)
  }
  registerPurchaseDetail(id:number,products:Product[]):Observable<any> {
    return this.http.post<any>(`${this.API}/orders/detail/${id}`,products);
  }

  getOrderDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/orders/detail/${id}`)
  }

  sendPayment(dto: CreateOrderDTO):Observable<any> {
    return this.http.post<any>(`${this.API}/orders`,dto);
  }
  getAllPendingOrders(){
    return this.http.get<OrderPayment[]>(`${this.API}/orders/pending`)
  }

 

  // generateOrder(data:CreateOrderDTO) {
  //   return this.http.post<OrderPayment>(`${this.API}/orders`, data)
  // }

  confirmOrder(id:number,status:string) {
    return this.http.put<OrderPayment>(`${this.API}/orders/confirm/${id}`,{status});
  }
}
