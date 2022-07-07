import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalProductos:number;
  constructor(
    private productsService:ProductsService
  ) { }

  ngOnInit(): void {

    this.productsService.getCount().subscribe(data=>{
      this.totalProductos=data.count;
    })
  }

}
