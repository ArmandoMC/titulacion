import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../models/brand.model';
import { Provider } from '../models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private API_URL='http://localhost:3000/api/providers';

  constructor(
    private http:HttpClient
  ) { }

  getAll(){
    return this.http.get<Provider[]>(`${this.API_URL}`);
  }
}
