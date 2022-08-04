import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any,arg: any):any {
    if(arg=="" || arg.length<3) 
    return value;
    const resultProducts:Product[]=[];
    for(const product of value){
      if(product.name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultProducts.push(product);
      }
    }
    return resultProducts;
  }

}
