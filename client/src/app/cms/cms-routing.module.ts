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
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer.component';
import { SalesComponent } from './pages/sales/sales.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { AddSubcategoryComponent } from './pages/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './pages/edit-subcategory/edit-subcategory.component';
import { AddBrandComponent } from './pages/add-brand/add-brand.component';
import { EditBrandComponent } from './pages/edit-brand/edit-brand.component';
import { AddProviderComponent } from './pages/add-provider/add-provider.component';
import { EditProviderComponent } from './pages/edit-provider/edit-provider.component';

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
        path: 'products/add',
        component: AddProductComponent,
      },
      
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'customers/add',
        component: AddCustomerComponent,
      },
      {
        path: 'products/:id',
        component: EditProductComponent,
      },
      {
        path: 'customers/:id',
        component: EditCustomerComponent,
      },
      
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/add',
        component: AddCategoryComponent,
      },
      {
        path: 'categories/category/:id',
        component: EditCategoryComponent,
      },
      {
        path: 'subcategories',
        component: SubcategoriesComponent,
      },
      {
        path: 'subcategories/add',
        component: AddSubcategoryComponent,
      },
      {
        path: 'subcategories/subcategory/:id',
        component: EditSubcategoryComponent,
      },
      {
        path: 'brands',
        component: BrandsComponent,
      },
      {
        path: 'brands/add',
        component: AddBrandComponent,
      },
      {
        path: 'brands/brand/:id',
        component: EditBrandComponent,
      },
      {
        path: 'providers',
        component: ProvidersComponent,
      },
      {
        path: 'providers/add',
        component: AddProviderComponent,
      },
      {
        path: 'providers/provider/:id',
        component: EditProviderComponent,
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
      {
        path: 'ventas',
        component: SalesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsRoutingModule {}
