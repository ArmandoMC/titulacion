import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer ,CreateCustomerDTO} from '../models/customer.model';

@Injectable()
export class CustomerService {

  private API_URL = 'http://localhost:3000/api/customers';
  constructor(
    private http: HttpClient
  ) { }

  create(data: CreateCustomerDTO) {
    return this.http.post<Customer>(`${this.API_URL}`, data);
  }
  
}
