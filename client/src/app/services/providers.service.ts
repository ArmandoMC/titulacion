import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../models/brand.model';
import { CreateProviderDTO, Provider } from '../models/provider.model';
import {tap}from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private API_URL='http://localhost:3000/api/providers';
  private myProviders: Provider[]=[];
  private providers= new BehaviorSubject<Provider[]>([]);
  providers$ = this.providers.asObservable();

  constructor(
    private http:HttpClient
  ) { }

  create(dto:CreateProviderDTO){
    return this.http.post<Provider>(`${this.API_URL}`,dto)
    .pipe(
      tap((provider)=>{
        this.myProviders.push(provider);
        this.providers.next(this.myProviders);
      })
    )
  }
  getAll(){
    return this.http.get<Provider[]>(`${this.API_URL}`)
    .pipe(
      tap((providers)=>{
        this.myProviders=providers;
        this.providers.next(this.myProviders);
      })
    )
  }

  update(id:number,dto:CreateProviderDTO){
    return this.http.put<Provider>(`${this.API_URL}/${id}`,dto)
    .pipe(
      tap((provider)=>{
        const indice=this.myProviders.findIndex(cat=>cat.id===provider.id);
        if(indice!=-1){
          this.myProviders[indice]=provider;
          this.providers.next(this.myProviders);
        }
       
      })
    )
  }
  delete(id:number){
    return this.http.delete<number>(`${this.API_URL}/${id}`);
  }
}
