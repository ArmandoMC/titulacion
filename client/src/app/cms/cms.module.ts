import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './pages/products/products.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SalesComponent } from './pages/sales/sales.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './pages/completed-orders/completed-orders.component';


@NgModule({
  declarations: [
    TasksComponent,
    GridComponent,
    LayoutComponent,
    ProductsComponent,
    CustomersComponent,
    OrdersComponent,
    SalesComponent,
    DashboardComponent,
    PendingOrdersComponent,
    CompletedOrdersComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    FormsModule
  ]
})
export class CmsModule { }
