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

  name: string;
  image: File;
  price: number;
  description: string;
  categoryId: number;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}
  // createProduct(name:HTMLInputElement,description:HTMLInputElement,price:HTMLInputElement,categoryId:HTMLInputElement) {

  //        this.productsService.createProductAndUpdateImage(name.value,this.file,description.value,Number.parseInt( price.value),Number.parseInt (categoryId.value))
  //     .subscribe(data => {
  //       // console.log(data);
  //       // this.router.navigate(['/login']);
  //         console.log('data obtenida',data)
  //     }, err => console.log(err))
  // }

  createProduct() {
    // this.productsService
    //   .createProductAndUpdateImage(
    //     this.name,
    //     this.image,
    //     this.description,
    //     this.price,
    //     this.categoryId
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }

  onPhotoSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.image = file;
      console.log(this.image);
    }
  }
}
