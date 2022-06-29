import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { StoreService } from '../../../services/store.service';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean=false;
  loggedInUser: string;
  role:string;
  subscription: Subscription;
  counter:Number = 0;
  categories: Category[] = [];
  usuario: User | null = null;
  profile: User | null = null;
  products:Product[]=[];
  numProducts = 0;

  constructor(
    private auhtService: AuthService,
    private storeService: StoreService,
    private categoriesService: CategoriesService,
    private cartService: CartService,
    private router: Router
  ) {
    // this.products=this.storeService.getShoppingCart();
    }

  ngOnInit(): void {
    // this.subscription = this.storeService.currentUser$.subscribe(
      // this.counter=this.storeService.getcontador();

    this.auhtService.user$.subscribe(data => {
      
        if(data){
          this.isLoggedIn = data.isLoggedIn;
          this.loggedInUser = data.email;
          this.role=data.role;
        }else{
          this.isLoggedIn=false;
        }
    },error=>{});

    this.storeService.myCart$.subscribe(data => {
      if(data){
        this.counter=data.reduce((sum,item)=>sum+item.oferta,0);
      }
      // this.products=products.length;
    });
    // this.conteo();

    // this.getAllCategories();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  logout() {
    this.auhtService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
  goCMS(){
    this.router.navigate(['/cms']);
  }
  // conteo(){
  //   this.counter=this.products.reduce((sum,item)=>sum+item.oferta,0);

  // }
}
