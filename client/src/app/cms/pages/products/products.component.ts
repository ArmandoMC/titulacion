import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
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
    this.page += 4;
    this.numPagina+=1;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 4;
    if(this.numPagina>1){
      this.numPagina-=1;
    }
  }

  onSearch( search: string ) {
    this.page = 0;
    this.search = search;
  }
}
