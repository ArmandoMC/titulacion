import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './pages/products/products.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { SalesComponent } from './pages/sales/sales.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './pages/completed-orders/completed-orders.component';
import { OnthewayOrdersComponent } from './pages/ontheway-orders/ontheway-orders.component';
import { ConfirmOrderComponent } from './pages/confirm-order/confirm-order.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';

@NgModule({
  declarations: [
    
    LayoutComponent,
    ProductsComponent,
    CustomersComponent,
    SalesComponent,
    DashboardComponent,
    PendingOrdersComponent,
    CompletedOrdersComponent,
    OnthewayOrdersComponent,
    ConfirmOrderComponent,
    InvoiceComponent,
    
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    FormsModule,
    
  ]
})
export class CmsModule { }
