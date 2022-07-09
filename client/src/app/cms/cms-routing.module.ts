import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProductsComponent } from './pages/products/products.component';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './pages/completed-orders/completed-orders.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OnthewayOrdersComponent } from './pages/ontheway-orders/ontheway-orders.component';
import { ConfirmOrderComponent } from './pages/confirm-order/confirm-order.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { ProvidersComponent } from './pages/providers/providers.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'brands',
        component: BrandsComponent,
      },
      {
        path: 'providers',
        component: ProvidersComponent,
      },
      {
        path: 'orders/pendientes',
        component: PendingOrdersComponent,
      },
      {
        path: 'orders/pendientes/confirm/:id',
        component: ConfirmOrderComponent,
      },
      {
        path: 'orders/finalizadas',
        component:CompletedOrdersComponent,
      },
      {
        path: 'orders/finalizadas/confirm/:id',
        component: ConfirmOrderComponent,
      },
      {
        path: 'orders/en-camino',
        component: OnthewayOrdersComponent,
      },
      {
        path: 'orders/en-camino/confirm/:id',
        component: ConfirmOrderComponent,
      },
      {
        path: 'factura/order/:id',
        component: InvoiceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsRoutingModule {}
