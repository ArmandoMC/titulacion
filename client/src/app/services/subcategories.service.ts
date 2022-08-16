import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { CreateSubCategoryDTO, SubCategory } from '../models/category.model';
import { Product } from '../models/product.model';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private API_URL='https://tienda-dima.herokuapp.com/api/subcategories';
  
  constructor(
    private http:HttpClient

  ) { }

  create(dto:CreateSubCategoryDTO){
    return this.http.post<SubCategory>(`${this.API_URL}`,dto);
  }
  getAll(){
    return this.http.get<SubCategory[]>(`${this.API_URL}`);
  }
  get(id:number){
    return this.http.get<SubCategory[]>(`${this.API_URL}/${id}`);
  }
  getProductsBySubCategory(id:number){
    
    return this.http.get<Product[]>(`${this.API_URL}/${id}/products`);
  }
  update(id:number,dto:CreateSubCategoryDTO){
    return this.http.put<SubCategory>(`${this.API_URL}/${id}`,dto);
  }
  delete(id:number){
    return this.http.delete<number>(`${this.API_URL}/${id}`);
  }
  getCount(){
    return this.http.get<any>(`${this.API_URL}/count`);
  }

  getProductsDeMayorAMenorPorSubcategoria(id:number){
    return this.http.get<Product[]>(`${this.API_URL}/${id}/products`)
    .pipe(
      tap((products)=>{
       products.sort((a,b)=> b.price - a.price)
      })
    )
  }
  getProductsDeMenorAMayorPorSubcategoria(id:number){
    return this.http.get<Product[]>(`${this.API_URL}/${id}/products`)
    .pipe(
      tap((products)=>{
       products.sort((a,b)=> a.price - b.price)
      })
    )
  }
}
