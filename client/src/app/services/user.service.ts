import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User,UpdateUserDTO} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'https://tienda-dima.herokuapp.com/api/users';

  constructor(
    private http:HttpClient
  ) { }


  getUser(id:number){
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }
  updatePassword(id: number,dto:UpdateUserDTO) {
    return this.http.patch<User>(`${this.API_URL}/${id}`,dto);
  }
  updateEmail(id: number,email:string) {
    return this.http.put<User>(`${this.API_URL}/update-email/${id}`,{email});
  }
}
