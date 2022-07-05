import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private API_URL='http://localhost:3000/api/status';

  constructor(
    private http:HttpClient
  ) { }

  getAll(){
    return this.http.get<Status[]>(`${this.API_URL}`);
  }
}
