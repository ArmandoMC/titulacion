import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { CreateOrderDTO, Fecha, OrderPayment, UpdateOrderDTO } from '../models/order.model';
import { Product } from '../models/product.model';
import {AuthService} from './auth.service';
import { Address } from '../models/address.model';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private API='http://localhost:3000/api';

  private myOrders: OrderPayment[]=[];

  private orders= new BehaviorSubject<OrderPayment[]>([]);
  orders$ = this.orders.asObservable();

  constructor(
    private http:HttpClient,
    private authService:AuthService

  ) { 
  }

  getOrderByCustomer(id: number): Observable<any> {
    return this.http.get<OrderPayment>(`${this.API}/orders/customer/${id}`)
    .pipe(
      tap((ord)=>{
        this.myOrders=ord;
        this.orders.next(this.myOrders);
      })
    )
  }
  getAddressByOrderId(id: number) {
    return this.http.get<Address>(`${this.API}/orders/address/${id}`)
  }
  registerPurchaseDetail(id:number,products:Product[]):Observable<any> {
    return this.http.post<any>(`${this.API}/orders/detail/${id}`,products);
  }

  getOrderDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/orders/detail/${id}`)
  }
  getOrder(id: string) {
    return this.http.get<OrderPayment>(`${this.API}/orders/${id}`)
  }

  sendPayment(dto: CreateOrderDTO):Observable<any> {
    return this.http.post<any>(`${this.API}/orders`,dto)
    .pipe(
      tap((data)=>{
        this.myOrders.push(data.data);
      
        this.orders.next(this.myOrders);
      })
    )
  }
  deleteOrder(id :number){
    return this.http.delete<number>(`${this.API}/orders/delete/${id}`)
    .pipe(
      tap((id)=>{
        const indice=this.myOrders.findIndex(or=>or.id===id);
        if(indice!=-1){
          this.myOrders.splice(indice,1);
          this.orders.next(this.myOrders)
        }

      })
    )

  }
  getUltimoId(){
    return this.http.get<number>(`${this.API}/orders/ultimoId`)

  }
  getAllPendingOrders(){
    return this.http.get<OrderPayment[]>(`${this.API}/orders/pending`)
    .pipe(
      tap(data=>{
        this.myOrders=data;
        this.orders.next(this.myOrders);
      })
    )
  }
  getAllOnTheWayOrders(){
    return this.http.get<OrderPayment[]>(`${this.API}/orders/ontheway`)
  
  }
  getAllCompletedOrders(){
    return this.http.get<OrderPayment[]>(`${this.API}/orders/completed`)
  
  }

  confirmOrder(id:number,status:string) {
    return this.http.put<OrderPayment>(`${this.API}/orders/pending/confirm/${id}`,{status});
  }
  getCountPendings(){
    return this.http.get<any>(`${this.API}/orders/count-pendings`)

  }
  getCountOnTheWay(){
    return this.http.get<any>(`${this.API}/orders/count-ontheway`)

  }
  getCountCompleted(){
    return this.http.get<any>(`${this.API}/orders/count-completed`)

  }
  
  getTotal(){
    return this.http.get<any>(`${this.API}/orders/count`)

  }
}
