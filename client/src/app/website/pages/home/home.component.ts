import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { SubCategory } from 'src/app/models/category.model';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { SubcategoriesService } from 'src/app/services/subcategories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subcategories:SubCategory[]=[{id:0,name:'Todos',description:''}];
  idSubcategoria:number=null;
  productsBySubcat:Product[]=[];
  pro: Product[] = [];
  limit=5;
  offset=0;
  productId:string | null=null;
  seleccionado="mayor a menor";
  vector=['Clasificación por defecto','mayor a menor','menor a mayor']
  constructor(
    private productsService:ProductsService,
    private categoriesService:CategoriesService,
    private subcategoriesService:SubcategoriesService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productsService.getAllProducts(this.limit,this.offset)
      .subscribe(data => {
        console.log(data);
        this.pro = data;
        this.offset+=this.limit;

      },err=>{'hubo erro de parametros'});
      
      // this.route.queryParamMap.subscribe(params=>{
      //   this.productId=params.get('product');
      //   // console.log(this.productId);
      // })
      this.subcategoriesService.getAll().subscribe(data=>{
        this.subcategories=this.subcategories.concat(data);
      })
  }

  onLoadMore(){
    if(this.idSubcategoria==null){
      this.productsService.getAllProducts(this.limit,this.offset)
      .subscribe(data => {
        this.pro=this.pro.concat(data);
        this.offset+=this.limit;
      });
    }
    if(this.idSubcategoria==0){
      this.productsService.getAllProducts()
      .subscribe(data => {
        this.pro=data;
        // this.offset+=this.limit;
      });
    }
     
    
   
  }
  onSelect(event:Event){
    const item=event.target as HTMLSelectElement;

    if(item.value=="mayor a menor"){
      console.log('value mayor a menor:',item.value)
      this.productsService.getProductsDeMayorAMenor().subscribe(data=>{
        this.pro=null;

        this.pro=data;

      })
    }else if(item.value=="menor a mayor"){
      console.log('value menor a mayor:',item.value)
      this.productsService.getProductsDeMenorAMayor().subscribe(data=>{
        this.pro=null;
        this.pro=data;
      })
    }else{
      this.productsService.getAllProducts()
      .subscribe(data => {
        console.log(data);
        this.pro = data;
      })
    }
  }

  obtener(id:number){
    this.idSubcategoria=id;
    if(id===0){
      console.log('id sub',id)
      this.productsService.getAllProducts()
      .subscribe(data => {
        this.pro=data;
        // this.offset+=this.limit;

      });
    }else{
      this.subcategoriesService.getProductsBySubCategory(this.idSubcategoria).subscribe(data=>{
        // this.productsBySubcat=data;
        this.pro=null;
        this.pro=data;
        // this.offset+=this.limit;

      })
    }
    
  }
}
