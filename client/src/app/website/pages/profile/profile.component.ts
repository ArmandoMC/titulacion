import { Component, OnInit } from '@angular/core';
import {AuthService}from '../../../services/auth.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User|null=null;

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$
    .subscribe(data=>{
      // console.log('data enviada por baceknd ',data);
      this.user=data;
    })
  }

}
