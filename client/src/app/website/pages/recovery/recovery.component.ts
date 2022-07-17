import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import{AuthService} from '../../../services/auth.service';

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
    private authService:AuthService
  ) {
    this.habilitar=false;
   }

  ngOnInit(): void {
  }

  enviar(f:NgForm){
    if(!f.valid){

    }else{
      this.authService.recovery(this.email).subscribe(data=>{
        console.log('respuesta:', data);
        this.habilitar=true;
      })
    }
  }
  reenviar(){
    this.authService.recovery(this.email).subscribe(data=>{
      console.log('respuesta:', data);
      this.habilitar=true;
    })
  }
}
