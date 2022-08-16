import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { StoreService } from './services/store.service';
import { ProvidersService } from './services/providers.service';
import { CustomerService } from './services/customer.service';
import { ProductsService } from './services/products.service';
import { BrandService } from './services/brand.service';
import { SubcategoriesService } from './services/subcategories.service';
import { CategoriesService } from './services/categories.service';
import { AlertsService } from './services/alerts.service';
import { AddressService } from './services/address.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import {NotFoundComponent} from './not-found/not-found.component';

import {QuicklinkModule} from 'ngx-quicklink';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    QuicklinkModule,
    BrowserAnimationsModule    
  ],
  providers: [AuthService, CustomerService,StoreService,ProvidersService,CustomerService,
    ProductsService,CategoriesService,SubcategoriesService,BrandService,AlertsService,AuthService,
    AddressService,UserService,
    
    {provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
