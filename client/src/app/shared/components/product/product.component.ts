import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()product:Product={
    id:'',
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
    image: '',
    public_id: '',
    category_id: 0,
    subcategory_id:0,
    provider_id:0,
    brand_id:0,
    status:'',


  }
  agregado:boolean=false;


  @Output() addedProduct=new EventEmitter<Product>();
  @Output() showProduct=new EventEmitter<string>();
   products:Product[]=[];
  cantidad=0;

  constructor(
    private storeService:StoreService
  ) {
   }

   ngOnInit(): void {
     this.storeService.myCart$.subscribe(data=>{
       this.products=data;
       

     })
   }

  onAddToCart(){
 
        this.addedProduct.emit(this.product);

  //        this.agregado=true;
  //      }
  }
  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }
  // verificar(products:Product[]){
  //   const indice=products.findIndex(p=>p.id==this.product.id)
  //      if(indice!=-1){
  //        this.agregado=false;
  //      }else{
  //       // this.addedProduct.emit(this.product);

  //        this.agregado=true;
  //      }
  // }
}
