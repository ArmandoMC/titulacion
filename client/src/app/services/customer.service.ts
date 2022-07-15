import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, switchMapTo, tap } from 'rxjs/operators';
import { Customer ,CreateCustomerDTO,UpdateCustomerDTO, CreateCustomerDTOByAdmin} from '../models/customer.model';
import{UserService} from './user.service';
@Injectable()
export class CustomerService {

  private API_URL = 'http://localhost:3000/api/customers';

  private myCustomers: any[]=[];
  private customers= new BehaviorSubject<any[]>([]);
  customers$ = this.customers.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  create(data: CreateCustomerDTO) {
    return this.http.post<Customer>(`${this.API_URL}`, data);
  }
  createByAdmin(data: any) {
    return this.http.post<any>(`${this.API_URL}/by-admin`, data)
    // .pipe(
    //   tap((dt)=>{
    //     const cust=dt.customer;
    //     const us=dt.user;
    //     const dato={
    //       id:cust.id,
    //       name:cust.name,
    //       last_name:cust.last_name,
    //       dni:cust.dni,
    //       phone:cust.phone,
    //       // user_id:cust.user_id,
    //       email:us.email
          
    //     }
    //     this.myCustomers.push(dato);
    //     this.customers.next(this.myCustomers);

    //   })
    // )
  }
  getAll(){
    return this.http.get<any[]>(`${this.API_URL}`)
    // .pipe(
    //   tap((data)=>{
    //    this.myCustomers=data;
    //    this.customers.next(this.myCustomers);

    //   })
    // )

  }
  getClient(id: number) {
    return this.http.get<Customer>(`${this.API_URL}/${id}`);
  }
  deleteClient(id:number){
      return this.http.delete<Customer>(`${this.API_URL}/${id}`);
  }
  updateDniAndPhone(id: number,dni:string,phone:string) {
    return this.http.put<Customer>(`${this.API_URL}/updateDniAndPhone/${id}`,{dni,phone});
  }
  updateNombreCompleto(id:number,name:string,lastName:string){
    return this.http.patch<Customer>(`${this.API_URL}/nombreCompleto/${id}`,{name,lastName});

  }
  updateDni(id:number,dni:string){
    return this.http.patch<Customer>(`${this.API_URL}/updateDni/${id}`,{dni});
  }
  updatePhone(id:number,phone:string){
    return this.http.patch<Customer>(`${this.API_URL}/updatePhone/${id}`,{phone});
  }
  updateClient(id:number,dto:UpdateCustomerDTO){
    return this.http.put<any>(`${this.API_URL}/${id}`,dto)
    // .pipe(
    //   tap((data=>{
    //     const cust=data.customer;
    //     const us=data.user;
        
    //     const indice=this.myCustomers.findIndex(cli=>cli.id===cust.id);
    //     if(indice!=-1){
    //       const dato={
    //         id:cust.id,
    //         name:cust.name,
    //         last_name:cust.last_name,
    //         dni:cust.dni,
    //         phone:cust.phone,
    //         email:us.email
    //       }
    //       this.myCustomers[indice]=dato;
    //       this.customers.next(this.myCustomers);
    //     }
    //   }))
    // )

  }
  getCount(){
    return this.http.get<any>(`${this.API_URL}/count`);
 
  }
}
