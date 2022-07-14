import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { OrderPayment } from 'src/app/models/order.model';

@Pipe({
  name: 'filtroVentas'
})
export class FiltroVentasPipe implements PipeTransform {
  pipe=new DatePipe('en-US');
  todayWithPipe=null;
  transform(datos: OrderPayment[],dateInicial:Date, dateFinal: Date): number {

    // const result:OrderPayment[]=[];
    let total=0;
    for(const item of datos){
    this.todayWithPipe=this.pipe.transform(item.created_at,'dd/MM/yyyy');
    // console.log('fecha item:',this.todayWithPipe)
    if(this.todayWithPipe>=dateInicial && this.todayWithPipe<=dateFinal){
      // const filteredDatos = datos.filter( dato => dato.name.toLowerCase().includes( search ) );
     total+=item.total;

    }
    }
    return total;
}

}
