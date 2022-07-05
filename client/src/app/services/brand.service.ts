import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private API_URL='http://localhost:3000/api/brands';

  constructor(
    private http:HttpClient
  ) { }

  getAll(){
    return this.http.get<Brand[]>(`${this.API_URL}`);
  }
}
