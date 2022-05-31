import { Injectable } from '@angular/core';
import{HttpClient,HttpParams} from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private API_URL='http://localhost:3000/api/categories';
  constructor(
    private http:HttpClient
  ) { }

  getAll(limit?:number,offset?:number){
    let params=new HttpParams();
    if(limit && offset!=null){
      params=params.set('limit',limit);
      params=params.set('offset',offset);
    }
    return this.http.get<Category[]>(`${this.API_URL}`,{params});
  }
}
