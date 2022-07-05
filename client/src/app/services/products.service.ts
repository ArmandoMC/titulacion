import { Injectable } from '@angular/core';
import {HttpClient,HttpParams,HttpErrorResponse,HttpStatusCode, HttpHeaders} from '@angular/common/http';
import { CreateProductDTO, CreateProductDTO2, Product, Product2, UpdateProductDTO } from '../models/product.model';
import{retry,catchError,map,tap} from 'rxjs/operators';
import{BehaviorSubject, Observable, throwError, zip} from 'rxjs';

import{environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private myProducts: Product[]=[];
  private products= new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();
  private API_URL='http://localhost:3000/api';
  constructor(
    private http:HttpClient,
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
    .pipe(
      tap((products)=>{
        this.myProducts=products;
        this.products.next(this.myProducts);
      })
    )

  }
  getProductsDeMenorAMayor(limit?:number, offset?:number){
    let params=new HttpParams();
    if(limit && offset!=null){
      params=params.set('limit',limit);
      params=params.set('offset',offset);
    }
    return this.http.get<Product[]>(`${this.API_URL}/products`,{params})
    .pipe(
      tap((products)=>{
       products.sort((a,b)=> a.price - b.price)
      })
    )
  }
  getProductsDeMayorAMenor(){
    return this.http.get<Product[]>(`${this.API_URL}/products`)
    .pipe(
      tap((products)=>{
       products.sort((a,b)=> b.price - a.price)
      })
    )
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
  createProductAndUpdateImage(name:string,description:string,sleeve_color:string,flavor:string,
    presentation:string,  packaging:string,  stock:number,  purchase_price:number, price:number,
    image:File,category_id:number,  brand:string,provider_id:number){
    
      const dt=new FormData();
    dt.append('name',name);
    dt.append('description',description);
    dt.append('sleeve_color',sleeve_color);
    dt.append('flavor',flavor);
    dt.append('presentation',presentation);
    dt.append('packaging',packaging);
    dt.append('stock',stock.toString());
    dt.append('purchase_price',purchase_price.toString());
    dt.append('price',  price.toString());
    dt.append('image',image);
    dt.append('category_id',category_id.toString());
    dt.append('brand',brand);
    dt.append('provider_id',provider_id.toString());
    
    return this.http.post<Product>(`${this.API_URL}/products`,dt)
    .pipe(
      tap((product)=>{
        this.myProducts.push(product);
        this.products.next(this.myProducts);
      })
    )
    
  }
  getUltimoId(){
    return this.http.get<any>(`${this.API_URL}/products/ultimoId`,{});
  }
  update(id:string,name:string,description:string,sleeve_color:string,flavor:string,presentation:string,
    packaging:string,stock:number,purchase_price:number,price:number,image:File,image_url:string,hayFoto:string,
    public_id:string,
    category_id:number,brand:string,provider_id:number){
      const dt=new FormData();
        dt.append('name',name);
        dt.append('description',description);
        dt.append('sleeve_color',sleeve_color);
        dt.append('flavor',flavor);
        dt.append('presentation',presentation);
        dt.append('packaging',packaging);
        dt.append('stock',stock.toString());
        dt.append('purchase_price',purchase_price.toString());
        dt.append('price',  price.toString());
        dt.append('image',image);
        dt.append('image_url',image_url);
        dt.append('hayFoto',hayFoto);
        dt.append('public_id',public_id);
        dt.append('category_id',category_id.toString());
        dt.append('brand',brand);
        dt.append('provider_id',provider_id.toString());
      
   
    return this.http.put<Product>(`${this.API_URL}/products/${id}`,dt)
    .pipe(
      tap((product)=>{
        const indice=this.myProducts.findIndex(p=>p.id===product.id);
        if(indice!=-1){
          this.myProducts[indice]=product;;
          this.products.next(this.myProducts);
        }
       
      })
    )
  }
  updateStockProducts(product:Product[]){
    return this.http.put<any>(`${this.API_URL}/products/updateStock`,product);
  }
  detele(id:string){
    return this.http.delete<Product>(`${this.API_URL}/products/${id}`);
  }

  getFile(url:string,type:string){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': 'text/plain, */*',
    //     'Content-Type': 'application/jpeg' // We send JSON
    //   }),
    //   responseType: 'text' as 'json'  // We accept plain text as response.
    // };
    return this.http.get(url,{responseType: 'blob'})
    .pipe(
      tap(content=>{
        const blob=new Blob([content],{type})
        console.log('este es blob:',blob)
      })
    )

  }


}
