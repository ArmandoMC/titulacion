import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pro: Product[] = [];
  limit=5;
  offset=0;
  productId:string | null=null;

  constructor(
    private productsService:ProductsService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productsService.getAllProducts(this.limit,this.offset)
      .subscribe(data => {
        // console.log(data);
        this.pro = data;
        this.offset+=this.limit;

      },err=>{'hubo erro de parametros'});
      
      this.route.queryParamMap.subscribe(params=>{
        this.productId=params.get('product');
        console.log(this.productId);
      })
  }

  onLoadMore(){
    this.productsService.getAllProducts(this.limit,this.offset)
    .subscribe(data => {
      this.pro=this.pro.concat(data);
      this.offset+=this.limit;
    });
  }

}
