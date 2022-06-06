import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Address, CreateAddressDTO } from '../models/address.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private API_URL='http://localhost:3000/api';
  private id_user:number=0;

  private myAddresses: Address[]=[];

  private addresses= new BehaviorSubject<Address[]>([]);
  addresses$ = this.addresses.asObservable();
  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) {

   this.authService.user$.subscribe()
   }

  

  create(dto:CreateAddressDTO){
    return this.http.post<Address>(`${this.API_URL}/address`,dto)
    .pipe(
      tap((address)=>{
        address.status='not-selected'
        this.myAddresses.push(address);
        this.addresses.next(this.myAddresses);
      })
    )
    
  }
  
  getAllAddress(idUser:number){
    
    return this.http.get<Address[]>(`${this.API_URL}/address/${idUser}`)
    .pipe(
      tap((response)=>{
        response.map(item=>{item.status='not-selected'})
        this.myAddresses=response;
        this.addresses.next(this.myAddresses);
      })
    )

  }

  updateVector(id:number){
    const indice=this.myAddresses.findIndex(ad=>ad.id==id);
    if(indice!=-1){
      this.myAddresses[indice].status='selected';
    }
  }
 

}
