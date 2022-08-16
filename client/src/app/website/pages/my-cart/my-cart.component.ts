import {
  Component,
  OnInit
 
} from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Product } from '../../../models/product.model';
// import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent implements OnInit {
  // @ViewChild('nombreSelect') nombre: ElementRef;

  total = 0;
  cantidadTotal = 0;
  subtotal: number = 0;
  seleccionado: number;
  productStock: number = 0;
  listaOferta: number[] = [];
  // private subscriber: Subscription;
  products: Product[] = [];
  numProducts = 0;
  logueado: boolean;
  orderId:number=0;
  // product.oferta:number=0;

  constructor(
    private storeService: StoreService,
    private tokenService: TokenService,
  ) {
    this.logueado = false;
  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((data) => {
      this.products = data;
      // console.log('nombre selc:', this.nombre.nativeElement.value);
      this.numProducts=this.products.reduce((sum,item)=>sum+item.oferta,0)
      this.total=this.storeService.getTotal();
      // this.listarOferta();
      // this.encontrarProduct();
    });

    const token = this.tokenService.getToken();
    if (token) {
      this.logueado = true;
    } else {
      this.logueado = false;
    }
  }
  // ngOnDestroy(): void {
  //   console.log('destruido');
  //   // this.subscriber.unsubscribe();
  // }
  eliminarProducto(productId: string) {
    // this.products.sort((a, b) => Number('' + a.id) - Number('' + b.id));
    this.storeService.eliminar(productId);
    console.log('eliminado');
  }
  
  restar(productId: string) {
    const element = this.products.find((p) => p.id === productId);
    if (element) {
      const ofertaFinal = element.oferta - 1;
      if(ofertaFinal===0){
        this.storeService.eliminar(productId);
      }else{
        element.oferta = ofertaFinal;
        this.storeService.addProduct(element);
      }
     
    }
  }
  sumar(productId:string){
    const element = this.products.find((p) => p.id === productId);
    if (element) {
      const ofertaFinal = element.oferta + 1;
      element.oferta = ofertaFinal;
      this.storeService.addProduct(element);
    }
  }
}
