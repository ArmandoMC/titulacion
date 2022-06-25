import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer ,CreateCustomerDTO,UpdateCustomerDTO} from '../models/customer.model';

@Injectable()
export class CustomerService {

  private API_URL = 'http://localhost:3000/api/customers';
  constructor(
    private http: HttpClient
  ) { }

  create(data: CreateCustomerDTO) {
    return this.http.post<Customer>(`${this.API_URL}`, data);
  }
  getClient(id: number) {
    return this.http.get<Customer>(`${this.API_URL}/${id}`);
  }
  updateDniAndPhone(id: number,dni:string,phone:string) {
    return this.http.put<Customer>(`${this.API_URL}/${id}`,{dni,phone});
  }
  updateNombreCompleto(id:number,dto:UpdateCustomerDTO){
    return this.http.put<Customer>(`${this.API_URL}/nombreCompleto/${id}`,dto);

  }
  
}
