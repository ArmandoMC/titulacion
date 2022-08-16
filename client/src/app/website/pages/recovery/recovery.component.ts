import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import{AuthService} from '../../../services/auth.service';
import{AlertsService} from '../../../services/alerts.service';
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  @ViewChild('formEmail')formEmail:NgForm;

  email:string="";
  habilitar:boolean;
  constructor(
    private authService:AuthService,
    private alertsService: AlertsService,

  ) {
    this.habilitar=false;
   }

  ngOnInit(): void {
  }

  enviar(f:NgForm){
    if(!f.valid){
      this.alertsService.alertaFailTop('top-end','error','Error!!','E-mail es necesario',false,1500);
    }else{
      this.authService.recovery(this.email).subscribe(data=>{
        if(data){
          this.alertsService.alertaSuccessTop('top-end','success','Envío exitoso',false,1500);
        }
        console.log('respuesta:', data);
        this.habilitar=true;
      },(()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','E-mail no válido',false,1500);
      }))
    }
  }
  reenviar(){
    this.habilitar=false;
  }
  
}
