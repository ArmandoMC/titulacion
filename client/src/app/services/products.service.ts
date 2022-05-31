import { Injectable } from '@angular/core';
import {HttpClient,HttpParams,HttpErrorResponse,HttpStatusCode} from '@angular/common/http';
import { CreateProductDTO, CreateProductDTO2, Product, Product2, UpdateProductDTO } from '../models/product.model';
import{retry,catchError,map,tap} from 'rxjs/operators';
import{Observable, throwError, zip} from 'rxjs';

import{environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL='http://localhost:3000/api';
  constructor(
    private http:HttpClient
  ) { }

  getByCategory(categoryId:string,limit?:number, offset?:number){
    let params=new HttpParams();
    if(limit && offset!=null){
      params=params.set('limit',limit);
      params=params.set('offset',offset);
    }
    return this.http.get<Product[]>(`${this.API_URL}/categories/${categoryId}/products`,{params});
  }
  getAllProducts(limit?:number, offset?:number){
    let params=new HttpParams();
    if(limit && offset!=null){
      params=params.set('limit',limit);
      params=params.set('offset',offset);
    }
    return this.http.get<Product[]>(`${this.API_URL}/products`,{params})

  }
  getProduct(id:string){
    return this.http.get<Product>(`${this.API_URL}/products/${id}`)
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error.status===HttpStatusCode.Conflict){
          return throwError('algo esta fallando en el server');

        }
        if(error.status===HttpStatusCode.NotFound){
          return throwError('El producto no existe');

        }
        if(error.status===HttpStatusCode.Unauthorized){
          return throwError('no estas permitido');

        }
        return throwError('ups algo salió mal');
      })
    )


  }

  // fetchReadAndUpdate(id:string,dto:UpdateProductDTO){
  //   return zip(
  //     this.getProduct(id),
  //     this.update(id,dto)
  //   );
  // }

  getProductsbyPage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.API_URL}/products`,{
      params:{limit,offset}
    });

  }

  // updateImagen(id:string,file:Blob){

  //   const dto=new FormData();
  //   dto.append('image',file);
  //   return this.http.put<Product2>(`${this.API_URL}/products/updateImage/${id}`,dto);
  // }
  create(dto:CreateProductDTO){
    return this.http.post<Product>(`${this.API_URL}/products`,dto);
    
  }
  createProductAndUpdateImage(name:string,image:File,description:string,price:number,categoryId:number){
    // const dt=new FormData();
    // dt.append('name',name);
    // dt.append('image',image);
    // dt.append('description',description);
    // dt.append('price',  price.toString());
    // dt.append('categoryId',categoryId.toString());
    
    // return this.http.post<Product>(`${this.API_URL}/products`,dt);
    
  }
  update(id:string,dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.API_URL}/products/${id}`,dto);
  }
  detele(id:string){
    return this.http.delete<number>(`${this.API_URL}/products/${id}`);
  }


}
