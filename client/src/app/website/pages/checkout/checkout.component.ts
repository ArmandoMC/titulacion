import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address, CreateAddressDTO } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from '../../../services/auth.service';
import { CheckoutService } from '../../../services/checkout.service';
import { CartService } from '../../../services/cart.service';
import { StoreService } from '../../../services/store.service';
import { CustomerService } from '../../../services/customer.service';
import { TokenService } from '../../../services/token.service';
import { ProductsService } from '../../../services/products.service';
// import { kushki } from "@kushki/js";
import { loadStripe } from '@stripe/stripe-js';
// import {WindowRef} from "../../WindowRef";
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OrderPayment,
  UpdateOrderDTO,
  CreateOrderDTO,
} from 'src/app/models/order.model';
import { switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { Customer } from 'src/app/models/customer.model';
import { zip } from 'rxjs';
// import {RestService} from "../../services/rest.service";
// import {ActivatedRoute} from "@angular/router";
// import {Toaster} from "ngx-toast-notifications";

declare global {
  interface window {
    Stripe?: any;
  }
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  addresses: Address[] = [];
  name_lastname: string;
  telefono: string;
  city: string;
  address: string;
  state: string;
  country: string;
  postal_code: string;
  idUsuario: number;
  logueado: boolean = false;
  showAddForm: boolean = false;
  showStep1: boolean = true;
  showStep2: boolean = false;
  showStep3: boolean = false;
  /////////////////
  // const elements = stripe.elements();
  private readonly STRIPE!: any; //TODO: window.Stripe
  private elementStripe!: any;
  cardNumber: any;
  cardCvv: any;
  cardExp: any;
  id: number;
  orderData!: any;
  cart: Product[] = [];
  total: number = 0;
  //variable spara customer
  customer: Customer;
  customer_name: string;
  customer_lastName: string;
  customer_email: string;
  customer_dni: string;
  customer_phone: string;
  customer_id: number = 0;
  disabledInput:boolean;
  ///////////////77
  address_id: number = 0;
  addressSelected: Address;
  status: string = 'Procesado';
  tarifaFija:number=3.50;
  newOrder: OrderPayment;
  disabledStep1: boolean = false;
  disabledStep2: boolean = true;
  disabledStep3: boolean = true;
  constructor(
    private authService: AuthService,
    private addressService: AddressService,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private storeService: StoreService,
    private customerService: CustomerService,
    private tokenService: TokenService,
    private productService: ProductsService,
    private router: Router
  ) {
    this.STRIPE = window.Stripe(environment.stripe_pk);
  }

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        tap((data) => {
          this.idUsuario = data.id;
          this.customer_email=data.email;
          console.log('user_id', this.idUsuario);

          this.customerService.getClient(this.idUsuario).subscribe((data) => {
            console.log(data);
            if (data) {
              this.customer = data;
              this.customer_id = this.customer.id;
              this.customer_name=this.customer.name;
              this.customer_lastName=this.customer.last_name;
              console.log('customer_id', this.customer_id);
              if(this.customer.dni!="" && this.customer.phone!=""){
                this.disabledInput=true;
                this.customer_dni=this.customer.dni;
                this.customer_phone=this.customer.phone;
              }else{
                this.disabledInput=false;
              }
            }
          });
        })
      )
      .subscribe();
    this.addressService.getAllAddress(this.idUsuario).subscribe((data) => {
      this.addresses = data;
    });

    this.storeService.myCart$.subscribe((data) => {
      this.cart = data;
    });
    this.total = this.storeService.getTotal();

    this.createStripeElement();
  }

  private createStripeElement = () => {
    const style = {
      base: {
        color: '#000000',
        fontWeight: 400,
        fontFamily: "'Poppins', sans-serif",
        fontSize: '20px',
        '::placeholder': {
          color: '#E3E2EC',
        },
      },
      invalid: {
        color: '#dc3545',
      },
    };

    //TODO: SDK de Stripe inicia la generacion de elementos
    this.elementStripe = this.STRIPE.elements({
      fonts: [
        {
          cssSrc:
            'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap',
        },
      ],
    });

    //TODO: SDK Construimos los inputs de tarjeta, cvc, fecha con estilos
    const cardNumber = this.elementStripe.create('cardNumber', {
      placeholder: '4242 4242 4242 4242',
      style,
      classes: {
        base: 'input-stripe-custom',
      },
    });
    const cardExp = this.elementStripe.create('cardExpiry', {
      placeholder: 'MM/AA',
      style,
      classes: {
        base: 'input-stripe-custom',
      },
    });
    const cardCvc = this.elementStripe.create('cardCvc', {
      placeholder: '000',
      style,
      classes: {
        base: 'input-stripe-custom',
      },
    });

    //TODO: SDK Montamos los elementos en nuestros DIV identificados on el #id
    cardNumber.mount('#card');
    cardExp.mount('#exp');
    cardCvc.mount('#cvc');

    this.cardNumber = cardNumber;
    this.cardExp = cardExp;
    this.cardCvv = cardCvc;
  };
  async initPay() {
    try {
      //TODO: SDK de Stripe genera un TOKEN para la intencion de pago!
      const { token } = await this.STRIPE.createToken(this.cardNumber);
      console.log('token creado', token.id);
      //TODO: Enviamos el token a nuesta api donde generamos (stripe) un metodo de pago basado en el token
      //TODO: tok_23213
      const newOrder: CreateOrderDTO = {
        customer_id: this.customer.id,
        address_id: this.address_id,
        total: (this.total+this.tarifaFija),
        status: this.status,
        token: token.id,
        name: this.customer.name,
      };
      console.log('ordensita',newOrder)
      this.checkoutService
        .sendPayment(newOrder)
        .pipe(
          tap(async (data) => {
            await this.STRIPE.handleCardPayment(data.resPaymentIntent.client_secret);
            // console.log('es m', m);
            console.log('DINERIO DINERO');
            // console.log('ide de orden',data.data.id)
            this.checkoutService.registerPurchaseDetail(data.data.id,this.cart).subscribe(detail=>{

                console.log('detalle registrado en bd:',detail)

                this.storeService.vaciarCart();
                this.router.navigate(['/home']);
            })
            this.productService.updateStockProducts(this.cart).subscribe(dt=>{
              console.log('data de stock actualzidos:',dt)
            })
          })

        )
        .subscribe((data) => {
          console.log('ultima data:', data)
         
        });
        
        this.customerService.updateDniAndPhone(this.customer_id,this.customer_dni,this.customer_phone)
        .subscribe(datos=>{
          console.log('dni y phone de cliente actualizados',datos)
        })
      // .subscribe();
    } catch (e) {
      //TODO: Nuestra api devolver un "client_secret" que es un token unico por intencion de pago
      //TODO: SDK de stripe se encarga de verificar si el banco necesita autorizar o no
      // this.toaster.open({text: 'Algo ocurrio mientras procesaba el pago', caption: 'ERROR', type: 'danger'})
      console.log('ALGO ACURRIO MIENTRAS SE PROCESABA EL PAGO');
    }
  }

  cancelar() {
    this.showAddForm = false;
  }

  addAddress() {
    const newAddress: CreateAddressDTO = {
      address: this.address,
      city: this.city,
      state: this.state,
      country: this.country,
      postal_code: this.postal_code,
      user_id: this.idUsuario,
    };
    this.addressService.create(newAddress).subscribe(
      (data) => {
        console.log('direccion añadida');
      },
      (error) => {
        console.log('error al agregar difeccion');
      }
    );
    this.showAddForm = false;
  }

  capturar() {
    this.showAddForm = true;
  }
  capturarIdAddress(id: number) {
    console.log('addres_id', id);
    this.address_id = id;
    this.addressSelected = this.addresses.find((dir) => dir.id == id);
    //  console.log(this.addressSelected)
  }
  goToStep2() {
    this.disabledStep1 = true;
    this.disabledStep2 = false;
  }
  bactToStep1() {
    this.disabledStep1 = false;
    this.disabledStep2 = true;
  }
  goToStep3() {
    this.disabledStep3 = false;
    this.disabledStep2 = true;
  }
  bactToStep2() {
    this.disabledStep3 = true;
    this.disabledStep2 = false;
  }
}
