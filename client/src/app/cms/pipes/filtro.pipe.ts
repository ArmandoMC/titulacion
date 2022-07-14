import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( datos: any[],page:number=0, search: string = '' ): any[] {
    if ( search.length === 0 )
      return datos.slice(page,page+2);
    const filteredDatos = datos.filter( dato => dato.name.includes( search ) );
    return filteredDatos.slice(page,page+2);
  }

}
