import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Address,
  CreateAddressDTO,
  UpdateAddressDTO,
} from '../models/address.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  // private API_URL = 'http://localhost:3000/api';
  private API_URL = 'https://tienda-dima.herokuapp.com/api';

  private myAddresses: Address[] = [];

  private addresses = new BehaviorSubject<Address[]>([]);
  addresses$ = this.addresses.asObservable();
  constructor(private http: HttpClient) {}

  create(dto: CreateAddressDTO) {
    return this.http.post<Address>(`${this.API_URL}/address`, dto).pipe(
      tap((address) => {
        this.myAddresses.push(address);
        this.addresses.next(this.myAddresses);
      })
    );
  }
  editar(id: number, dto: UpdateAddressDTO) {
    return this.http.put<Address>(`${this.API_URL}/address/${id}`, dto).pipe(
      tap((address) => {
        const indice = this.myAddresses.findIndex((d) => d.id === address.id);
        if (indice != -1) {
          this.myAddresses[indice] = address;
          this.addresses.next(this.myAddresses);
        }
      })
    );
  }

  getAllAddress(idUser: number) {
    return this.http.get<Address[]>(`${this.API_URL}/address/${idUser}`).pipe(
      tap((response) => {
        // response.map(item=>{item.status='not-selected'})
        this.myAddresses = response;
        this.addresses.next(this.myAddresses);
      })
    );
  }
  delete(id: number) {
    return this.http.delete<Address>(`${this.API_URL}/address/${id}`);
  }
}
