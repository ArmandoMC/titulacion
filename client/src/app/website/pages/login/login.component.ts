import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../../models/user.model';
import{AuthService} from '../../../services/auth.service';
import{AlertsService} from '../../../services/alerts.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @ViewChild('loginForm') loginForm:NgForm;

  email: string;
  password: string;
  token='';
  usuario:User | null=null;
  profile:User | null=null;

  // @Output() logueado=new EventEmitter<User>();
  constructor(
    private router:Router,
    private authService: AuthService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() {
  
  }

  login(f:NgForm) {
    if(!f.valid){
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    }else{
      this.authService.login(this.email, this.password)
      .subscribe(()=>{
        this.alertsService.alertaSuccessTop('top-end','success','Login exitoso',false,1500);
        this.router.navigate(['/home']);
      },()=>{
        this.alertsService.alertaFailTop('top-end','error','Error!!','Credenciales incorrectas',false,1500);
      });
    }
    
  }

  // getProfile(){
  //   this.authService.getProfile()
  //   .subscribe(
  //     profile=>{
  //         console.log('usuario logueado: ' ,profile);
  //     },
  //     err=>console.log('Hubo un errorerr' , err)
  //   )
  // }

  // loginAndGet(){

  // }
}