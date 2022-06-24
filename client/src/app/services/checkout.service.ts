import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { CreateOrderDTO, OrderPayment, UpdateOrderDTO } from '../models/order.model';
import { Product } from '../models/product.model';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private API='http://localhost:3000/api';

  private myOrders: OrderPayment[]=[];
  private myOrdersPending: OrderPayment[]=[];

  private orders= new BehaviorSubject<OrderPayment[]>([]);
  orders$ = this.orders.asObservable();
  private ordersPending= new BehaviorSubject<OrderPayment[]>([]);
  ordersPending$ = this.ordersPending.asObservable();

  constructor(
    private http:HttpClient,
    private authService:AuthService

  ) { 
    // this.authService.user$.subscribe()

  }

  getVectorOrder(){
    return this.myOrders;
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
  getAllCompletedOrders(){
    return this.http.get<OrderPayment[]>(`${this.API}/orders/completed`)
  
  }

 

  // generateOrder(data:CreateOrderDTO) {
  //   return this.http.post<OrderPayment>(`${this.API}/orders`, data)
  // }

  confirmOrder(id:number,confirmation:boolean) {
    return this.http.put<OrderPayment>(`${this.API}/orders/confirm/${id}`,{confirmation})
    // .pipe(
    //   tap(data=>{
    //     const indice= this.myOrders.findIndex(p=>p.id===data.id);
    //     if(indice!=-1){
    //       this.myOrders[indice]=data;
    //       // this.myOrdersPending[indice]=data;
    //       this.orders.next(this.myOrders);
    //     // this.ordersPending.next(this.myOrdersPending);
    //     }
       
      
    //   })
  }
}
