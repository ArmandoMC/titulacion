import { Injectable } from '@angular/core';
import{HttpClient,HttpParams} from '@angular/common/http';
import { Category, CreateCategoryDTO,CreateSubCategoryDTO, SubCategory } from '../models/category.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private API_URL='http://localhost:3000/api/categories';
  
  // private myCategories: Category[]=[];
  // private categories= new BehaviorSubject<Category[]>([]);
  // categories$ = this.categories.asObservable();
  
  constructor(
    private http:HttpClient
  ) { }

  create(dto:CreateCategoryDTO){
    return this.http.post<Category>(`${this.API_URL}`,dto);
  }
  getAll(){
    return this.http.get<Category[]>(`${this.API_URL}`)
  }
  update(id:number,dto:CreateCategoryDTO){
    return this.http.put<Category>(`${this.API_URL}/${id}`,dto);
  }
  delete(id:number){
    return this.http.delete<number>(`${this.API_URL}/${id}`);
  }
  get(id:number){
    return this.http.get<Category[]>(`${this.API_URL}/${id}`);
  }
  getCount(){
    return this.http.get<any>(`${this.API_URL}/count`);
  }

}
