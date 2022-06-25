import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User,UpdateUserDTO} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:3000/api/users';

  constructor(
    private http:HttpClient
  ) { }


  updatePassword(id: number,dto:UpdateUserDTO) {
    return this.http.patch<User>(`${this.API_URL}/${id}`,dto);
  }
  updateEmail(id: number,email:string) {
    return this.http.put<User>(`${this.API_URL}/update-email/${id}`,{email});
  }
}
