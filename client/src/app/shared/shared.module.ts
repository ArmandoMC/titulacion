import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ImgComponent } from './components/img/img.component';
// import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ImgComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    // SwiperModule,
    FormsModule

  ],
  exports: [
    ProductComponent,
    ProductsComponent,
    ImgComponent,
  ],
})
export class SharedModule {}
