import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProvidersService } from 'src/app/services/providers.service';
import { CreateProviderDTO,Provider } from 'src/app/models/provider.model';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

 
  providers:Provider[]=[];
 
 
  filterProvider:string="";
  constructor(
    private providersService:ProvidersService

  ) { }

  ngOnInit(): void {
    this.providersService.getAll().subscribe(data=>{
      this.providers=data;
    });
  }
  

  
 
  
}
