import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProvidersService } from 'src/app/services/providers.service';
import { CreateProviderDTO, Provider } from 'src/app/models/provider.model';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
})
export class ProvidersComponent implements OnInit {
  providers: Provider[] = [];

  filterProvider: string = '';
  public page: number = 0;
  public search: string = '';
  public numPagina: number = 1;

  constructor(private providersService: ProvidersService) {}

  ngOnInit(): void {
    this.providersService.getAll().subscribe((data) => {
      this.providers = data;
    });
  }
  nextPage() {
    this.page += 4;
    this.numPagina += 1;
  }

  prevPage() {
    if (this.page > 0) 
    this.page -= 4;
    if (this.numPagina > 1) {
      this.numPagina -= 1;
    }
  }

  onSearch(search: string) {
    this.page = 0;
    this.search = search;
  }
}
