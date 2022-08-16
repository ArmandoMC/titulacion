import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { OrderPayment } from 'src/app/models/order.model';
import { format } from 'date-fns';
import isWithinInterval from 'date-fns/isWithinInterval';


@Pipe({
  name: 'filtroFecha',
})
export class FiltroFechaPipe implements PipeTransform {
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  fechaInicial = null;
  fechaFinal = null;
  todayWithPipe2 = null;
  fechaInicial2 = null;
  fechaFinal2 = null;
  nnDate: any;
  transform(
    datos: OrderPayment[],
    dateInicial: any,
    dateFinal: any,
    search: string = ''
  ): OrderPayment[] {
    const result: OrderPayment[] = [];

    let filteredDatos: OrderPayment[] = [];
    let filteredDatos2: OrderPayment[] = [];
    const f = dateInicial.split('-');
    const anioInicial = Number(f[2]);
    const mesInicial = Number(f[1]);
    const diaInicial = Number(f[0]);

    const f2 = dateFinal.split('-');
    const anioFinal = Number(f2[2]);
    const mesFinal = Number(f2[1]);
    const diaFinal = Number(f2[0]);
    // this.nnDate = format(new Date(anioInicial, mesInicial - 1, diaInicial), 'dd-MM-yyyy');
    // console.log('esta es newdate desde pipe:', this.nnDate);
    
   
    let total: number = 0;
    let num: number = 0;
    if (search.length === 0) {
      for (const item of datos) {
       
        // this.todayWithPipe =format(
        //         item.created_at,
        //         'dd-MM-yyyy'
        //       );
        const fec = format(new Date(item.created_at), 'dd-MM-yyyy');
        const vector = fec.split('-');
        const diaIterado = Number(vector[0]);
        const mesIterado = Number(vector[1]);
        const anioIterado = Number(vector[2]);
        console.log('fec:', fec);
        const valor = isWithinInterval(
          new Date(anioIterado, mesIterado, diaIterado),
          {
            start: new Date(anioInicial, mesInicial, diaInicial),
            end: new Date(anioFinal, mesFinal, diaFinal),
          }
        );
        if (valor == true) {
          num += 1;
          total += item.total;
          item.totalVentas = total;
          item.numVentas = num;
          result.push(item);
        }
      }
      return result;
    } else {
      filteredDatos = datos.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLowerCase())
      );
      let total: number = 0;
        let num: number = 0;
      for (const item of filteredDatos) {
      
        const fec = format(new Date(item.created_at), 'dd-MM-yyyy');
        const vector = fec.split('-');
        const diaIterado = Number(vector[0]);
        const mesIterado = Number(vector[1]);
        const anioIterado = Number(vector[2]);
        console.log('fec:', fec);
        const valor = isWithinInterval(
          new Date(anioIterado, mesIterado, diaIterado),
          {
            start: new Date(anioInicial, mesInicial, diaInicial),
            end: new Date(anioFinal, mesFinal, diaFinal),
          }
        );
        if (valor == true) {
          
          num += 1;
          total += item.total;
          item.totalVentas = total;
          item.numVentas = num;
          filteredDatos2.push(item);
        }
      }
      return filteredDatos2;
    }

  
  }
}
