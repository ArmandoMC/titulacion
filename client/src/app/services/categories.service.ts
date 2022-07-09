import { Injectable } from '@angular/core';
import{HttpClient,HttpParams} from '@angular/common/http';
import { Category, CreateCategoryDTO, SubCategory } from '../models/category.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private API_URL='http://localhost:3000/api/categories';
  
  private myCategories: Category[]=[];
  private categories= new BehaviorSubject<Category[]>([]);
  categories$ = this.categories.asObservable();
  constructor(
    private http:HttpClient
  ) { }

  create(dto:CreateCategoryDTO){
    return this.http.post<Category>(`${this.API_URL}`,dto)
    .pipe(
      tap((category)=>{
        this.myCategories.push(category);
        this.categories.next(this.myCategories);
      })
    )
  }
  getAll(){
    // let params=new HttpParams();
    // if(limit && offset!=null){
    //   params=params.set('limit',limit);
    //   params=params.set('offset',offset);
    // }
    return this.http.get<Category[]>(`${this.API_URL}`)
    .pipe(
      tap((categories)=>{
        this.myCategories=categories;
        this.categories.next(this.myCategories);
      })
    )
  }
  update(id:number,dto:CreateCategoryDTO){
    return this.http.put<Category>(`${this.API_URL}/${id}`,dto)
    .pipe(
      tap((category)=>{
        const indice=this.myCategories.findIndex(cat=>cat.id===category.id);
        if(indice!=-1){
          this.myCategories[indice]=category;
          this.categories.next(this.myCategories);
        }
       
      })
    )
  }

  delete(id:number){
    return this.http.delete<number>(`${this.API_URL}/${id}`);
  }
  //subcategorias
    

  getAllSubcategories(){
    return this.http.get<SubCategory[]>(`${this.API_URL}/subcategories`,{});
  }
}
