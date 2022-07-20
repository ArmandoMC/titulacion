import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  alertaSuccessTop(position:any,icon:any,title:any,showConfirmButton:boolean,timer:number){
    return Swal.fire({position,icon,title,showConfirmButton,timer});

  }
  alertaFailTop(position:any,icon:any,title:any,text:string,showConfirmButton:boolean,timer:number){
    return Swal.fire({position,icon,title,text,showConfirmButton,timer});

  }
  alertaDelete(title:string,text:string,icon:any,showCancelButton:boolean,confirmButtonColor:string,
    cancelButtonColor:string,confirmButtonText:string){
    return Swal.fire({title,text,icon,showCancelButton,confirmButtonColor,cancelButtonColor,
      confirmButtonText})

  }
}
