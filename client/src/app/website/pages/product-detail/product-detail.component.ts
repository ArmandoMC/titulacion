import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../../../services/products.service';
import { SubcategoriesService } from '../../../services/subcategories.service';
import { StoreService } from '../../../services/store.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  // @Output() mostrar=new EventEmitter<boolean>();
  productStock: number = 0;
  productId: string | null = null;
  product: Product | null = null;
  listaOferta: number[] = [];
  cantidad = 0;
  agregado: boolean = false;
  isStock: boolean;
  seleccionado: string = '' + 1;
  isDisabled: boolean;
  products: Product[] = [];

  subcategory_id: number = 0;
  mostrar:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private subcategoriesService: SubcategoriesService,
    private storeService: StoreService,
    private location: Location,
    private alertsService: AlertsService
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
          this.subcategory_id = data.subcategory_id;
          this.productStock = data.stock;
          if (this.productStock > 5) {
            this.isStock = true;
          } else {
            this.isStock = false;
          }
          this.listarOferta();
          this.storeService.myCart$.subscribe((cart) => {
            const encontrado = cart.find(
              (element) => element.id === this.product.id
            );
            if (encontrado) {
              this.agregado = true;
              this.isDisabled = true;
              this.seleccionado = '' + encontrado.oferta;
            } else {
              this.agregado = false;
              this.isDisabled = false;
            }
          });
          this.subcategoriesService
            .getProductsBySubCategory(this.subcategory_id)
            .subscribe((data) => {
              console.log('data por subcategoria:', data);
              if (
                this.subcategory_id == 1 ||
                this.subcategory_id == 2 ||
                this.subcategory_id == 3
              ) {
                this.products = [];
                this.products.push(data[0]);
                this.products.push(data[1]);
                this.products.push(data[2]);
                this.products.push(data[3]);
              } else {
                this.products = [];
                this.products.push(data[0]);
                this.products.push(data[1]);
                this.products.push(data[2]);
              }
             
            });
        }
      });
    // this.productsService.getAllProducts().subscribe(data=>{
    //   this.products=data;
    // })
  }

  onAddToShoppingCart() {
    if (this.product) {
      this.product.oferta = Number.parseInt(this.seleccionado);
      this.storeService.addProduct(this.product);
      this.agregado = true;
      this.alertsService.alertaSuccessTop(
        'top-end',
        'success',
        'Producto agregado al carrito',
        false,
        1500
      );
    }
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
