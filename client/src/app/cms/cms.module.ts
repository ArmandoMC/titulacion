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
import { FilterPipe } from './pipes/filter.pipe';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FiltroFechaPipe } from './pipes/filtro-fecha.pipe';
import { FiltroVentasPipe } from './pipes/filtro-ventas.pipe';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { AddSubcategoryComponent } from './pages/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './pages/edit-subcategory/edit-subcategory.component';
import { AddBrandComponent } from './pages/add-brand/add-brand.component';
import { EditBrandComponent } from './pages/edit-brand/edit-brand.component';
import { AddProviderComponent } from './pages/add-provider/add-provider.component';
import { EditProviderComponent } from './pages/edit-provider/edit-provider.component';
import { MenuNosotrosComponent } from './pages/menu-nosotros/menu-nosotros.component';

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
    FilterPipe,
    CategoriesComponent,
    BrandsComponent,
    ProvidersComponent,
    SubcategoriesComponent,
    FiltroPipe,
    AddProductComponent,
    EditProductComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    FiltroFechaPipe,
    FiltroVentasPipe,
    AddCategoryComponent,
    EditCategoryComponent,
    AddSubcategoryComponent,
    EditSubcategoryComponent,
    AddBrandComponent,
    EditBrandComponent,
    AddProviderComponent,
    EditProviderComponent,
    MenuNosotrosComponent
    
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    FormsModule,
    ScrollingModule,
    NgxChartsModule,    
  ]
})
export class CmsModule { }
