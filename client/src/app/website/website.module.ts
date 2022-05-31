import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HeaderComponent } from './components/header/header.component';

import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import {SwiperModule} from 'swiper/angular';
import  {SharedModule} from '../shared/shared.module';
import {QuicklinkModule} from 'ngx-quicklink';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../guards/auth.guard';
import { CheckoutGuard } from '../guards/checkout.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MyCartComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule,
    QuicklinkModule,
    FormsModule
  ],
  providers:[AuthGuard,CheckoutGuard]
})
export class WebsiteModule { }
