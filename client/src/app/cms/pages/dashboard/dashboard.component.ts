import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {CheckoutService} from '../../../services/checkout.service';
import {CategoriesService} from '../../../services/categories.service';
import {CustomerService} from '../../../services/customer.service';
import {BrandService} from '../../../services/brand.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalProductos:number;
  totalOrdersPendings:number;
  totalOrdersOnTheWay:number;
  totalOrdersCompleted:number;
  totalCategories:number;
  totalCustomers:number;
  totalBrands:number;
  constructor(
    private productsService:ProductsService,
    private checkoutService:CheckoutService,
    private categoriesService:CategoriesService,
    private customerService:CustomerService,
    private brandService:BrandService,
  ) { }

  ngOnInit(): void {

    this.productsService.getCount().subscribe(data=>{
      this.totalProductos=data.count;
      console.log('toal p',data)

    })
    this.checkoutService.getCountPendings().subscribe(data=>{
      this.totalOrdersPendings=data.count;
    })
    this.checkoutService.getCountOnTheWay().subscribe(data=>{
      this.totalOrdersOnTheWay=data.count;
    })
    this.checkoutService.getCountCompleted().subscribe(data=>{
      this.totalOrdersCompleted=data.count;
    })
    this.categoriesService.getCount().subscribe(data=>{
      this.totalCategories=data.count;
    })
    this.customerService.getCount().subscribe(data=>{
      this.totalCustomers=data.count;
    })
    this.brandService.getCount().subscribe(data=>{
      this.totalBrands=data.count;
    })
  }

}
