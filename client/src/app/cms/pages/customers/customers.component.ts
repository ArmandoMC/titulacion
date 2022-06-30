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
  client:Customer={
    id:0,
    name:'',
    last_name:'',
    dni:'',
    phone:'',
    user:{
      email:'',
      password:''
    }
  }
  address:CreateAddressDTO={
    address:'',
    city:'',
    state:'',
    country:'',
    postal_code:'',
    user_id:0
  }
  customers:any[]=[];
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
  addClient(f:NgForm){
    if(!f.valid){

    }else{
      const newCustomer:any={
        name:this.client.name,
        last_name:this.client.last_name,
        dni:this.client.dni,
        phone:this.client.phone,
        user:{
          email:this.client.user.email,
          password:this.client.user.password
        }
      }
      this.customerService.createByAdmin(newCustomer).subscribe(cliente=>{
        console.log('cliente creado:', cliente)
        this.clientForm.resetForm();
        this.cerrarModalAdd();
      })

    }
  }
  updateClient(f:NgForm){
    if(!f.valid){

    }else{

    }
  }
  deleteClient(id:number){
    this.customerService.deleteClient(id).subscribe(data=>{
      console.log('client eliminado:', data)
    })
    const indice=this.customers.findIndex(cli=>cli.id===id);
    this.customers.splice(indice,1);
  }

  editar(id:number){

    const item=this.customers.find(item=>item.id===id);
    if(item){
      this.client.id=id;
      console.log('id cliente',this.client.id)
      this.client.name=item.name;
      this.client.last_name=item.last_name;
      this.client.dni=item.dni;
      this.client.phone=item.phone;
      this.client.user.email=item.email;
      // this.client.=item.postal_code;
      // this.idAddress=item.id;
    }
   
  }
  editarCliente(f:NgForm){
    
    if(!f.valid){

    }else{
      const dto:UpdateCustomerDTO={
        name:this.client.name,
        last_name:this.client.last_name,
        dni:this.client.dni,
        phone:this.client.phone,
        user:{
          email:this.client.user.email, 
        }
      }
      
      this.customerService.updateClient(this.client.id,dto).subscribe(client=>{
        console.log('cliente actualizado',client);
        this.editForm.resetForm();
        this.cerrarModalEdit();
      
        // this.editForm.resetForm();
        // this.cerrarModalEdit();
      })
    }
    
  }
  private cerrarModalAdd(){
    this.botonCerrarAdd.nativeElement.click();
  }
  private cerrarModalEdit(){
    this.botonCerrarEdit.nativeElement.click();
  }

}
