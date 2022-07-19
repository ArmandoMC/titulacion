import { Injectable } from '@angular/core';
import{HttpClient,HttpParams} from '@angular/common/http';
import { CreateMenuNosotrosDTO,UpdateMenuNosotrosDTO, Menu } from '../models/menu.model';
import { Sugerencias, UpdateSugerenciasDTO } from '../models/sugerencias.model';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private API_URL='http://localhost:3000/api/menus';
  
  constructor(
    private http:HttpClient
  ) { }

  create(dto:CreateMenuNosotrosDTO){
    return this.http.post<Menu>(`${this.API_URL}/nosotros`,dto);
  }
  getAll(){
    return this.http.get<Menu[]>(`${this.API_URL}`)
  }
  getAllSugerencias(){
    return this.http.get<Sugerencias>(`${this.API_URL}/sugerencias`)
  }
  update(id:number,dto:UpdateMenuNosotrosDTO){
    return this.http.put<Menu>(`${this.API_URL}/nosotros/${id}`,dto);
  }
  updateSugerencias(id:number,dto:UpdateSugerenciasDTO){
    return this.http.put<Sugerencias>(`${this.API_URL}/sugerencias/${id}`,dto);
  }
  delete(id:number){
    return this.http.delete<number>(`${this.API_URL}/nosotros/${id}`);
  }
  get(id:number){
    return this.http.get<Menu>(`${this.API_URL}/nosotros/${id}`);
  }
  getCount(){
    return this.http.get<any>(`${this.API_URL}/count`);
  }

}
