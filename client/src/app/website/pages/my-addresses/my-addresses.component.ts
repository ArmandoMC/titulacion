import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { FlashMessageService,FlashMessage } from 'angular2-flash-message';
import { tap } from 'rxjs/operators';
import { Address, CreateAddressDTO, UpdateAddressDTO } from 'src/app/models/address.model';
import{AddressService} from '../../../services/address.service';
import{AuthService} from '../../../services/auth.service';
import{CustomerService} from '../../../services/customer.service';



@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.css']
})
export class MyAddressesComponent implements OnInit {

  @ViewChild('addressForm') addressForm:NgForm;
  @ViewChild('editForm') editForm:NgForm;
  @ViewChild('botonCerrar') botonCerrar:ElementRef;
  @ViewChild('botonCerrarEditar') botonCerrarEditar:ElementRef;
  addresses: Address[] = [];
  idUsuario: number;
  modoEdit:boolean=false;
  //variables para editar direccion
  idAddress:number;
  city: string;
  address: string;
  state: string;
  country: string;
  postal_code: string;
  //variables para crear una direccion nueva
  dirNueva:string;
  cityNueva:string;
  stateNuevo:string;
  countryNuevo:string;
  postal_codeNuevo:string;

  constructor(
    private addressService:AddressService,
    private authService:AuthService,
    private customerService:CustomerService,
    // private flashMessages:FlashMessageService,
  ) { }

  ngOnInit(): void {
    this.authService.user$
    .subscribe(data=>{
      this.idUsuario = data.id;
      this.addressService.getAllAddress(this.idUsuario).subscribe();

    });
    this.addressService.addresses$.subscribe(data=>{
      this.addresses=data;
    })
  }

  // flash=new FlashMessage();

  addAddress(f:NgForm) {

    if(!f.valid){
      // this.flash.message='Por favor llenar el formulario correctamente';
      // this.flash.isSuccess=true;
      // this.flash.timeoutInMS=50000;
      // this.flashMessages.display(this.flash);
    }else{

      const dto: CreateAddressDTO = {
        address: this.dirNueva,
        city: this.cityNueva,
        state: this.stateNuevo,
        country: this.countryNuevo,
        postal_code: this.postal_codeNuevo,
        user_id: this.idUsuario,
      }
      this.addressService.create(dto).subscribe((data) => {
          console.log('direccion añadida',data);
         
          this.addressForm.resetForm();
          this.cerrarModalAdd();
        },
        (error) => console.log('')
      );
    }

  } 
  editar(id:number){

    const item=this.addresses.find(item=>item.id===id);
    if(item){
      this.address=item.address;
      this.city=item.city;
      this.state=item.state;
      this.country=item.country;
      this.postal_code=item.postal_code;
      this.idAddress=item.id;
    }
   
  }

  editarAddress(f:NgForm){
    
    if(!f.valid){

    }else{
      const dto:UpdateAddressDTO={
        address:this.address,
        city:this.city,
        state:this.state,
        country:this.country,
        postal_code:this.postal_code,
        user_id:this.idUsuario
      }
      
      this.addressService.editar(this.idAddress,dto).subscribe(direccion=>{
        console.log('direccion actualizada',direccion);
      
        this.editForm.resetForm();
        this.cerrarModalEdit();
      })
    }
    
  }

  eliminar(id:number){
    this.idAddress=id;
    
    this.addressService.delete(this.idAddress).subscribe(data=>{
      console.log('direccion eliminada:',data)
     
    })
    const indice=this.addresses.findIndex(ad=>ad.id===id);
    if(indice!=-1){
      this.addresses.splice(indice,1);
    }
  }
  private cerrarModalAdd(){
    this.botonCerrar.nativeElement.click();
  }
  private cerrarModalEdit(){
    this.botonCerrarEditar.nativeElement.click();
  }
}
  

