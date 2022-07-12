import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {Customer,CreateCustomerDTOByAdmin, CreateCustomerDTO,UpdateCustomerDTO} from '../../../models/customer.model';
import { NgForm } from '@angular/forms';
import { Address,CreateAddressDTO } from 'src/app/models/address.model';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @ViewChild('addForm') clientForm:NgForm;
  @ViewChild('editForm') editForm:NgForm;
  @ViewChild('botonCerrarAdd') botonCerrarAdd:ElementRef;
  @ViewChild('botonCerrarEdit') botonCerrarEdit:ElementRef;
  idUsuario:number;
  customers:any[]=[];
  filterCustomer:string="";
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;
  constructor(
    private customerService:CustomerService,
    private userService:UserService,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {

    this.authService.user$.subscribe(user=>{
      this.idUsuario=user.id;
    })
    this.customerService.getAll().subscribe()
    this.customerService.customers$.subscribe(data=>{
      this.customers=data;
      console.log('vector de any:',this.customers)
    })
  }
  nextPage() {
    this.page += 4;
    this.numPagina+=1;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 4;
    if(this.numPagina>1){
        this.numPagina-=1;
     }
  }

  onSearch( search: string ) {
    this.page = 0;
    this.search = search;
  }
}
