import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  logueado:boolean=false;
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$
    .subscribe(data=>{
      if(data){
        this.logueado=data.isLoggedIn;
      }else{
        this.logueado=false;
      }
    })
  }

}
