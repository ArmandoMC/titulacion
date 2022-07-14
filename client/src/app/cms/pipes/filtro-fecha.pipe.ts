import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { OrderPayment } from 'src/app/models/order.model';

@Pipe({
  name: 'filtroFecha'
})
export class FiltroFechaPipe implements PipeTransform {

  pipe=new DatePipe('en-US');
  todayWithPipe=null;

  transform(datos: OrderPayment[],dateInicial:Date, dateFinal: Date): OrderPayment[] {

      const result:OrderPayment[]=[];
      let total:number=0;
      let num:number=0;
      for(const item of datos){
      this.todayWithPipe=this.pipe.transform(item.created_at,'dd/MM/yyyy');
      console.log('fecha item:',this.todayWithPipe)
      if(this.todayWithPipe>=dateInicial && this.todayWithPipe<=dateFinal){
        // const filteredDatos = datos.filter( dato => dato.name.toLowerCase().includes( search ) );
        num+=+1;
        total+=item.total;
        item.totalVentas=total;
        item.numVentas=num;
        result.push(item);
      }
      }
      return result;
  }

}
