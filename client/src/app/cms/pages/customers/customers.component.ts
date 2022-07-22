import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers:any[]=[];
  filterCustomer:string="";
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;
  constructor(
    private customerService:CustomerService,
  ) { }

  ngOnInit(): void {

  
    this.customerService.getAll().subscribe(data=>{
      this.customers=data;

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
