import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';

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

    }else{
      this.authService.changePassword(this.token,this.newPassword).subscribe(data=>{
        console.log('respuesta: ',data);
        this.router.navigate(['/login']);
      })
    }
  }

}
