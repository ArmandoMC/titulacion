import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import {
  CreateProductDTO,
  CreateProductDTO2,
} from '../../../models/product.model';

// interface HTMLInputElement extends Event{
//   target:HTMLInputElement & EventTarget
// }

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  photoSelected: string | ArrayBuffer | null;

  
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}
  

}
