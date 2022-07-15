import { Injectable } from '@angular/core';
import{HttpClient,HttpParams} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateSubCategoryDTO, SubCategory } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private API_URL='http://localhost:3000/api/subcategories';
  private mySubcategories: SubCategory[]=[];
  private subcategories= new BehaviorSubject<SubCategory[]>([]);
  subcategories$ = this.subcategories.asObservable();
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
    return this.http.put<SubCategory>(`${this.API_URL}/${id}`,dto)
    .pipe(
      tap((subcategory)=>{
        const indice=this.mySubcategories.findIndex(cat=>cat.id===subcategory.id);
        if(indice!=-1){
          this.mySubcategories[indice]=subcategory;
          this.subcategories.next(this.mySubcategories);
        }
       
      })
    )
  }
  delete(id:number){
    return this.http.delete<number>(`${this.API_URL}/${id}`);
  }
}
