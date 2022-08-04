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

import { HomeComponent } from './pages/home/home.component';
import {AuthGuard} from '../guards/auth.guard';
import {ExitGuard} from '../guards/exit.guard';
import {CheckoutGuard} from '../guards/checkout.guard';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { MenuNosotrosComponent } from './pages/menu-nosotros/menu-nosotros.component';
import { SugerenciasComponent } from './pages/sugerencias/sugerencias.component';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

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
        canActivate:[AuthGuard],
        component: AccountComponent,
      },
      {
        path: 'my-cart',
        component: MyCartComponent,
      },
      {
        path: 'my-addresses',
        canActivate:[AuthGuard],
        component: MyAddressesComponent,
      },
      {
        path: 'orders',
        canActivate:[AuthGuard],
        component: OrdersComponent,
      },
      {
        path: 'checkout',
        canActivate:[AuthGuard],
        component: CheckoutComponent,
      },
     
      {
        path: 'institucional/quienes-somos',
        component: MenuNosotrosComponent,
      },
      {
        path: 'institucional/sugerencias',
        component: SugerenciasComponent,
      },
      {
        path: 'institucional/terminos-condiciones',
        component: TerminosComponent
      },
      {
        path: 'institucional/contacto',
        component: ContactoComponent
      },
      {
        path: 'home/preguntas-frecuentes',
        component: PreguntasFrecuentesComponent
      },
      {
        path: 'recovery',
        component: RecoveryComponent,
      },
      {
        path: 'login',
        canActivate:[CheckoutGuard],
        component: LoginComponent,
      },
      {
        path: 'register',
        // canDeactivate:[ExitGuard],
        component: RegisterComponent,
      },
      {
        path: 'recovery/new-password/:token',
        component: ResetPasswordComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
