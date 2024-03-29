import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { TokenService } from './token.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private API_URL = 'http://localhost:3000/api/auth';
  private API_URL = 'https://tienda-dima.herokuapp.com/api/auth';
  // private API_URL2 = 'http://localhost:3000/api/users';
  private API_URL2 = 'https://tienda-dima.herokuapp.com/api/users';
  us: User = {
    id: 0,
    email: '',
    password: '',
    role: '',
    isLoggedIn: false,
  };
  private user = new BehaviorSubject<User|null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    private tokenService: TokenService
  ) {
    // this.verifycurrentSession();
  }

  // verifycurrentSession() {
  //   let currentsession = this.getSessionData();
  //   if (currentsession) {
  //     this.storeService.setCurrentUser(JSON.parse(currentsession));
  //   }
  // }

  // getSessionData() {
  //   let currentSession = localStorage.getItem('session');
  //   return currentSession;
  // }
  saveToken(user:User,token:string) {
    user.isLoggedIn = false;
    let currenSession = localStorage.getItem('token');
    if (currenSession) {
      return false;
    } else {
      user.isLoggedIn = true;
      localStorage.setItem('token', token);
      this.user.next(user);
      return true;
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap((response) =>
          this.saveToken(response.user,response.token)
        )
      );
  }

  logout() {
    this.tokenService.removeToken();
    this.user.next(null as User);

    // this.storeService.setCurrentUser({user:{},token:''} as  Auth);
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(switchMap(() => this.getProfile()));
  }
  getProfile() {
    return this.http
      .get<User>(`${this.API_URL}/ver-perfil`)
      .pipe(
        tap((user)=>{
          user.isLoggedIn=true;
          this.user.next(user);
        })
      );
  }
  updateEmail(id: number,email:string) {
    return this.http.put<User>(`${this.API_URL2}/update-email/${id}`,{email})
    .pipe(
      tap((user)=>{
        user.isLoggedIn=true;
        this.user.next(user);
      })
    )
  }
  recovery(email:string){
    return this.http.post<any>(`${this.API_URL}/recovery`,{email});
  }
//   setCurrentUser(currentUser: Auth) {
//       this.user.next(currentUser);
//     // }
// }
  changePassword(token:string,newPassword:string){
    return this.http.post<any>(`${this.API_URL}/change-password`,{token,newPassword});
  }


// isValidtoken() {
//   return !!localStorage.getItem('session');
// }

}
