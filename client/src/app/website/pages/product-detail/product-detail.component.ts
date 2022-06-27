import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../../../services/products.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productStock: number = 0;
  productId: string | null = null;
  product: Product | null = null;
  listaOferta: number[] = [];
  cantidad = 0;
  agregado: boolean = false;
  isStock:boolean;
  seleccionado: string = '' + 1;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private storeService: StoreService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productsService.getProduct(this.productId);
          }
          return [null];
        })
      )
      .subscribe((data) => {
        if (data) {
          this.product = data;
          this.productStock = data.stock;
          if(this.productStock>5){
            this.isStock=true;
          }else{
            this.isStock=false;
          }
          this.listarOferta();
          this.storeService.myCart$.subscribe(cart=>{
            const encontrado = cart.find((element) => element.id === this.product.id);
            if (encontrado) {
              this.agregado = true;
              this.seleccionado = '' + encontrado.oferta;
            } else {
              this.agregado = false;
            }
          })

         
        }
      });

      // this.storeService.myCart$.subscribe(data=>{
      //   if(this.productId){
      //     const encontrado = data.find((element) => element.id === this.productId);
      //     if (encontrado) {
      //       this.agregado = true;
      //       this.seleccionado = '' + encontrado.oferta;
      //     } else {
      //       this.agregado = false;
      //     }
        
      //   }
       
      // })
  }

  onAddToShoppingCart() {
    if (this.product) {
      this.product.oferta = Number.parseInt(this.seleccionado);
      this.storeService.addProduct(this.product);
      this.agregado = true;
    }

    // this.total = this.storeService.getTotal();
  }

  goToBack() {
    this.location.back();
  }

  listarOferta() {
    for (let index = 1; index <= this.productStock; index++) {
      this.listaOferta.push(index);
    }
  }
}
