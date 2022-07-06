import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/account/account.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MyAddressesComponent } from './pages/my-addresses/my-addresses.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';

import { HomeComponent } from './pages/home/home.component';
import {AuthGuard} from '../guards/auth.guard';
import {ExitGuard} from '../guards/exit.guard';
import {CheckoutGuard} from '../guards/checkout.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
        data:{
          preload:true
        }

      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'profile',
        canActivate:[AuthGuard],
        component: ProfileComponent,
      },
      {
        path: 'account',
        // canActivate:[AuthGuard],
        component: AccountComponent,
      },
      {
        path: 'my-cart',
        component: MyCartComponent,
      },
      {
        path: 'my-addresses',
        component: MyAddressesComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'checkout',
        canActivate:[CheckoutGuard],
        component: CheckoutComponent,
      },
     
      // {
      //   path: 'checkout/address',
      //   // canActivate:[CheckoutGuard],
      //   component: MyAddressesComponent,
      // },
      {
        path: 'recovery',
        component: RecoveryComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        canDeactivate:[ExitGuard],
        component: RegisterComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
