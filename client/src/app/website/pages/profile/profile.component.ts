import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';
import { UpdateUserDTO, User } from '../../../models/user.model';
import { tap } from 'rxjs/operators';
import { Customer, UpdateCustomerDTO } from 'src/app/models/customer.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  @ViewChild('editNombreApellido') editNombreApellido:NgForm;
  @ViewChild('editDni') editDni:NgForm;
  @ViewChild('ededitTelefonoitDni') editTelefono:NgForm;
  @ViewChild('botonCerrarNC') botonCerrarNC:ElementRef;
  @ViewChild('botonCerrarDni') botonCerrarDni:ElementRef;
  @ViewChild('botonCerrarPhone') botonCerrarPhone:ElementRef;
  @ViewChild('botonCerrarEmail') botonCerrarEmail:ElementRef;
  @ViewChild('botonCerrarContrasena') botonCerrarContrasena:ElementRef;

  //variables para user
  user: User | null = null;
  idUsuario: number;
  email: string;
  password: string;
  password_aux:string;
  role:string="";
  //variables para customer
  customer: Customer;
  name: string = '';
  last_name: string = '';
  dni: string = '';
  phone: string = '';
  existeDni: boolean;
  existePhone: boolean;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        tap((user) => {
          this.idUsuario = user.id;
          this.email = user.email;
          this.password = user.password_real;
          this.role=user.role;
          this.customerService.getClient(this.idUsuario).subscribe((client) => {
            this.name = client.name;
            this.last_name = client.last_name;
            this.dni = client.dni;

            this.phone = client.phone;
            if (this.dni!='') {
              this.existeDni = true;
            } else {
              this.existeDni = false;
            }
            if (this.dni!=null) {
              this.existeDni = true;
            } else {
              this.existeDni = false;
            }
            if (this.phone!='') {
              this.existePhone = true;
            } else {
              this.existePhone = false;
            }
            if (this.phone!=null) {
              this.existePhone = true;
            } else {
              this.existePhone = false;
            }
          });
        })
      )

      .subscribe((data) => {
        // console.log('data enviada por baceknd ',data);
        this.user = data;
      });
  }

  editarNombreCompleto(f:NgForm) {
    if(!f.valid){

    }else{
      // const dto: UpdateCustomerDTO = {
      //   name: this.name,
      //   last_name: this.last_name,
      //   dni: this.dni,
      //   phone: this.phone,
      // };
      this.customerService
        .updateNombreCompleto(this.idUsuario, this.name,this.last_name)
        .subscribe((client) => {
          this.name = client.name;
          this.last_name = client.last_name;
          this.cerrarModalNC();
        });
    }
    
  }
  editarDni(f:NgForm){
    if(!f.valid){

    }else{
      this.customerService.updateDni(this.idUsuario,this.dni).subscribe(data=>{
        console.log('dni actualizado',data)
        this.dni = data.dni;
        this.existeDni=true;
        this.cerrarModalDni();
      })
    }
  }
  editarPhone(f:NgForm){
  if(!f.valid){

    }else{
      this.customerService.updatePhone(this.idUsuario,this.phone).subscribe(data=>{
        console.log('phone actualziado',data)
        this.phone = data.phone;
        this.existePhone=true;
        this.cerrarModalPhone();
      })
    }
  }
  editarContrasena(f:NgForm){
    if(!f.valid){

    }else{
      const dto:UpdateUserDTO={
        email:this.email,
        password:this.password_aux,
        role:this.role
      }
      this.userService.updatePassword(this.idUsuario,dto).subscribe(user=>{
        this.email=user.email;
        this.password=user.password_real;
        console.log('contra actualza:',user.password_real)
        this.cerrarModalContraseña();
      })
    }
   
  }
  editarEmail(f:NgForm){
    if(!f.valid){

    }else{
      this.authService.updateEmail(this.idUsuario,this.email).subscribe(user=>{
        this.email=user.email;
        this.cerrarModalEmail();
      })
    }
 
  }
  cerrarModalNC(){
    this.botonCerrarNC.nativeElement.click();
  }
  cerrarModalDni(){
    this.botonCerrarDni.nativeElement.click();
  }
  cerrarModalPhone(){
    this.botonCerrarPhone.nativeElement.click();
  }
  cerrarModalEmail(){
    this.botonCerrarEmail.nativeElement.click();
  }
  cerrarModalContraseña(){
    this.botonCerrarContrasena.nativeElement.click();
  }
}
