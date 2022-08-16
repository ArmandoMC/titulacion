import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand, CreateBrandDTO } from '../models/brand.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private API_URL='https://tienda-dima.herokuapp.com/api/brands';
  private myBrands: Brand[]=[];
  private brands= new BehaviorSubject<Brand[]>([]);
  brands$ = this.brands.asObservable();
  constructor(
    private http:HttpClient
  ) { }

  create(dto:CreateBrandDTO){
    return this.http.post<Brand>(`${this.API_URL}`,dto);
    // .pipe(
    //   tap((brand)=>{
    //     this.myBrands.push(brand);
    //     this.brands.next(this.myBrands);
    //   })
    // )
  }
  getAll(){
    return this.http.get<Brand[]>(`${this.API_URL}`);
  }
  get(id:number){
    return this.http.get<Brand>(`${this.API_URL}/${id}`);
  }
  update(id:number,dto:CreateBrandDTO){
    return this.http.put<Brand>(`${this.API_URL}/${id}`,dto);
  }

  delete(id:number){
    return this.http.delete<number>(`${this.API_URL}/${id}`);
  }
  getCount(){
    return this.http.get<any>(`${this.API_URL}/count`)

  }
}
