import { Component, Input, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

import {
  
  Product,
  
} from 'src/app/models/product.model';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  @Input() mostrar:boolean;
  // @Input() productId:string | null=null;
  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }

  @Output() loadMore = new EventEmitter<Product[]>();
  // @Output() mostrar=new EventEmitter<boolean>();
  today = new Date(2021, 1, 21);
  date = new Date(2021, 1, 21);
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    name: '',
    description: '',
    sleeve_color: '',
    flavor: '',
    presentation: '',
    packaging: '',
    stock: 0,
    oferta:0,
    purchase_price: 0,
    price: 0,
    // price:0,
    image: '',
    public_id: '',
    category_id: 0,
    subcategory_id:0,
    brand_id: 0,
    provider_id:0,
    status: '',
  };
  filterProduct:string="";
  pageActual:any=1;
  // limit=5;
  // offset=0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  // mostrar:boolean=true;
 
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
    this.mostrar=true;
  }
 

  // ngOnInit(): void {
  //   this.productsService.getAllProducts(this.limit,this.offset)
  //     .subscribe(data => {
  //       this.products = data;
  //       this.offset+=this.limit;

  //     },err=>{'hubo erro de parametros'});
  // }

  onAddToShoppingCart(product: Product) {
    product.oferta=1;
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    // this.toggleProductDetail();
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }

    this.productsService.getProduct(id).subscribe(
      (data) => {
        // this.toggleProductDetail();
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      }
    );
  }

  // readAndUpdate(id:string){
  //   this.productsService.getProduct(id)
  //   .pipe(
  //     switchMap((product)=>this.productsService.update(product.id,{name:'sssjjs'})),
  //   )
  //   .subscribe(data=>{console.log(data);})

  //   zip(
  //     this.productsService.getProduct(id),
  //     this.productsService.update(id,{name:'sssjjs'})
  //   )
  //   .subscribe(response=>{
  //     const read=response[0];
  //     const update=response[1];
  //   })
  // }


  updateProduct() {
    // const changes: UpdateProductDTO = {
    //   name: 'celular xaomi',
    //   image: 'http://placeimg.com/640/480',
    //   description: 'nada',
    //   price: 3000,
    //   categoryId: 3,
    // };
    // const id = this.productChosen.id;
    // this.productsService.update(id, changes).subscribe((data) => {
    //   const productIndex = this.products.findIndex(
    //     (item) => item.id === this.productChosen.id
    //   );
    //   this.products[productIndex] = data;
    // });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.detele(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  onLoadMore() {
    this.loadMore.emit();
  }
}
