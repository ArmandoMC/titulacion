import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProviderDTO, Provider } from '../models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private API_URL='https://tienda-dima.herokuapp.com/api/providers';
  

  constructor(
    private http:HttpClient
  ) { }

  create(dto:CreateProviderDTO){
    return this.http.post<Provider>(`${this.API_URL}`,dto);
    
  }
  getAll(){
    return this.http.get<Provider[]>(`${this.API_URL}`);
  }
  get(id:number){
    return this.http.get<Provider>(`${this.API_URL}/${id}`);
  }

  update(id:number,dto:CreateProviderDTO){
    return this.http.put<Provider>(`${this.API_URL}/${id}`,dto);
  }
  delete(id:number){
    return this.http.delete<number>(`${this.API_URL}/${id}`);
  }
  getCount(){
    return this.http.get<any>(`${this.API_URL}/count`);
  }
}
