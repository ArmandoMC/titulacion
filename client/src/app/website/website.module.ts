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
import { MyAddressesComponent } from './pages/my-addresses/my-addresses.component';
import { AccountComponent } from './pages/account/account.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { MenuNosotrosComponent } from './pages/menu-nosotros/menu-nosotros.component';
import { SugerenciasComponent } from './pages/sugerencias/sugerencias.component';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { FooterComponent } from './components/footer/footer.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
// import { FlashMessageModule } from 'angular2-flash-message';

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
    CheckoutComponent,
    MyAddressesComponent,
    AccountComponent,
    OrdersComponent,
    InvoiceComponent,
    ResetPasswordComponent,
    MenuNosotrosComponent,
    SugerenciasComponent,
    TerminosComponent,
    FooterComponent,
    PreguntasFrecuentesComponent,
    ContactoComponent
    
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
