import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { Category, SubCategory } from 'src/app/models/category.model';
import { BrandService } from 'src/app/services/brand.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { Brand } from 'src/app/models/brand.model';
import { Status } from 'src/app/models/status.model';
import { StatusService } from 'src/app/services/status.service';
import { NgForm } from '@angular/forms';
import { Provider } from 'src/app/models/provider.model';
import {
  Product,
 
} from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
 
  products:Product[]=[];
 
  //Filtrado
  filterProduct:string="";

  // public products: any[] = [];
  public page: number = 0;
  public search: string = '';
  public numPagina:number=1;
  constructor(
    private productsService: ProductsService
  ) {
    }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data=>{
      this.products = data;

    });
  }
  nextPage() {
    this.page += 2;
    this.numPagina+=1;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 2;
    if(this.numPagina>1){
      this.numPagina-=1;
    }
  }

  onSearch( search: string ) {
    this.page = 0;
    this.search = search;
  }
}
