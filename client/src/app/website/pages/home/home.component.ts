import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/models/category.model';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../../services/products.service';
import { SubcategoriesService } from 'src/app/services/subcategories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;
  subcategories: SubCategory[] = [{ id: 0, name: 'Todos los productos', description: '' }];
  idSubcategoria: number = null;
  productsBySubcat: Product[] = [];
  pro: Product[] = [];
  // limit = 20;
  // offset = 0;
  // productId:string | null=null;
  // seleccionado = 'mayor a menor';
  vector = [
    'Clasificación por defecto',
    'Precio: mayor a menor',
    'Precio: menor a mayor',
    'Nombre',
  ];
  filterProduct: string = '';

  constructor(
    private productsService: ProductsService,
    private subcategoriesService: SubcategoriesService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(
      (data) => {
        console.log(data);
        this.pro = data;
      }
    );

    // this.route.queryParamMap.subscribe(params=>{
    //   this.productId=params.get('product');
    //   // console.log(this.productId);
    // })
    this.subcategoriesService.getAll().subscribe((data) => {
      this.subcategories = this.subcategories.concat(data);
    });
  }
  nextPage() {
    this.page += 20;
    this.numPagina += 1;
  }

  prevPage() {
    if (this.page > 0) this.page -= 20;
    if (this.numPagina > 1) {
      this.numPagina -= 1;
    }
  }

  onSearch(search: string) {
    this.page = 0;
    this.search = search;
  }
  // onLoadMore() {
  //   if (this.idSubcategoria == null) {
  //     this.productsService
  //       .getAllProducts(this.limit, this.offset)
  //       .subscribe((data) => {
  //         this.pro = this.pro.concat(data);
  //         this.offset += this.limit;
  //       });
  //   }
  //   if (this.idSubcategoria == 0) {
  //     this.productsService.getAllProducts().subscribe((data) => {
  //       this.pro = data;
  //       // this.offset+=this.limit;
  //     });
  //   }
  // }
  onSelect(event: Event) {
    const item = event.target as HTMLSelectElement;

    if (item.value == 'Precio: mayor a menor') {
      console.log('value mayor a menor:', item.value);
      if (this.idSubcategoria != null && this.idSubcategoria != 0) {
        this.subcategoriesService
          .getProductsDeMayorAMenorPorSubcategoria(this.idSubcategoria)
          .subscribe((dt) => {
            // this.pro = null;

            this.pro = dt;
          });
      } else {
        this.productsService.getProductsDeMayorAMenor().subscribe((data) => {
          // this.pro = null;
          this.pro = data;
        });
      }
    } else if (item.value == 'Precio: menor a mayor') {
      console.log('value menor a mayor:', item.value);
      if (this.idSubcategoria != null && this.idSubcategoria != 0) {
        this.subcategoriesService
          .getProductsDeMenorAMayorPorSubcategoria(this.idSubcategoria)
          .subscribe((dt) => {
            // this.pro = null;
            this.pro = dt;
          });
      } else {
        this.productsService.getProductsDeMenorAMayor().subscribe((data) => {
          // this.pro = null;
          this.pro = data;
        });
      }
    } else if (item.value == 'Nombre') {
      if (this.idSubcategoria != null && this.idSubcategoria != 0) {
        this.subcategoriesService
          .getProductsDeMenorAMayorPorSubcategoria(this.idSubcategoria)
          .subscribe((dt) => {
            // this.pro = null;
            this.pro = dt;
          });
      } else {
        this.productsService.getProductsPorNombre().subscribe((data) => {
          console.log(data);
          // this.pro = null;
          this.pro = data;
        });
      }
    } else {
      if(this.idSubcategoria==null || this.idSubcategoria==0)
      this.productsService.getAllProducts().subscribe((data) => {
        console.log(data);
        this.pro = data;
      });
    }
  }

  obtener(id: number) {
    this.idSubcategoria = id;
    if (id === 0) {
      console.log('id sub', id);
      this.productsService.getAllProducts().subscribe((data) => {
        this.pro = data;
        // this.offset+=this.limit;
      });
    } else {
      this.subcategoriesService
        .getProductsBySubCategory(this.idSubcategoria)
        .subscribe((data) => {
          // this.productsBySubcat=data;
          this.pro = null;
          this.pro = data;
          // this.offset+=this.limit;
        });
    }
  }
}
