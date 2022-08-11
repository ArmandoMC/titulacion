import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import{AlertsService} from '../../../services/alerts.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild('formClave')formClave:NgForm;
  newPassword:string="";
  token:string | null=null;
  constructor(
    private authService:AuthService,
    private route:ActivatedRoute,
    private router:Router,
    private alertsService: AlertsService,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      console.log('toke url:',params);
     this.token=params.get('token');
     console.log('token asignado',this.token);
    })
  }

  restablecer(f:NgForm){
    if(!f.valid){
      this.alertsService.alertaFailTop('top-end','error','Error!!','Contraseña es necesaria',false,1500);

    }else{
      this.authService.changePassword(this.token,this.newPassword).subscribe(data=>{
        console.log('respuesta: ',data);
        if(data){
          this.alertsService.alertaSuccessTop('top-end','success','Hecho',false,1500);
        }
        this.router.navigate(['/login']);
      },(()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','No se pudo restablecer contraseña',false,1500);
      }))
    }
  }

}
