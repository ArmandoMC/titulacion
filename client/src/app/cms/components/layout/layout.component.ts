import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isLoggedIn: boolean=false;
  loggedInUser: string;
  role:string;
  // subscription: Subscription;
  counter:Number = 0;
  // categories: Category[] = [];
  usuario: User | null = null;
  profile: User | null = null;
  constructor(
    private auhtService: AuthService,
    private router: Router


  ) { }

  ngOnInit(): void {

    this.auhtService.user$.subscribe(data => {
      
      if(data){
        this.isLoggedIn = data.isLoggedIn;
        this.loggedInUser = data.email;
        this.role=data.role;
      }else{
        this.isLoggedIn=false;
      }
  },error=>{});

  // this.storeService.myCart$.subscribe(data => {
  //   if(data){
  //     this.counter=data.reduce((sum,item)=>sum+item.oferta,0);
  //   }
  //   // this.products=products.length;
  // });
  }

  logout() {
    this.auhtService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
  goToHome(){
    this.router.navigate(['/home']);
  }

}
