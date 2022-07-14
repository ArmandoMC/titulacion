import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { Category, SubCategory } from 'src/app/models/category.model';
import { BrandService } from 'src/app/services/brand.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { Brand } from 'src/app/models/brand.model';
import { Status } from 'src/app/models/status.model';
import { StatusService } from 'src/app/services/status.service';
import { NgForm } from '@angular/forms';
import { Provider } from 'src/app/models/provider.model';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/app/models/product.model';
import { SubcategoriesService } from 'src/app/services/subcategories.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('addForm') addForm: NgForm;
  @ViewChild('botonCerrarAdd') botonCerrarAdd: ElementRef;
  @ViewChild('editForm') editForm: NgForm;
  @ViewChild('botonCerrarEdit') botonCerrarEdit: ElementRef;

  photoSelected: string | ArrayBuffer | null;
  id: string;
  codigo: string;
  name: string;
  description: string;
  sleeve_color: string = '';
  flavor: string;
  presentation: string;
  packaging: string;
  stock: number;
  oferta: number;
  purchase_price: number;
  price: number;
  image?: File = new File([], '');
  category_id: number;
  subcategory_id: number;
  brand_id: number;
  provider_id: number;
  /////////////
  categories: Category[] = [];
  subcategories: SubCategory[] = [];
  brands: Brand[] = [];
  categoria:Category={
    id:0,name:'Lacteos',description:''
  };
  providers: Provider[] = [{ id: 0, name: 'Seleccionar',ruc:'',address:'',phone:''}];
  products: Product[] = [];
  product: Product = {
    id: '',
    cod_product: '',
    name: '',
    description: '',
    sleeve_color: '',
    flavor: '',
    presentation: '',
    packaging: '',
    stock: 0,
    oferta: 0,
    purchase_price: 0,
    price: 0,
    image: '',
    category_id: 0,
    subcategory_id:0,
    brand_id: 0,
    provider_id: 0,
    status: '',
  };
  image_url: string;
  cat_seleccionada: string;
  subcat_seleccionada: string;
  prov_seleccionado: string;
  brand_seleccionada:string;
  hayFoto: string = 'No';
  vectorCat:string[]=[];
  vectorSubCat:string[]=[];
  vectorProv:string[]=[];
  vectorBrand:string[]=[];
  insertarUno:boolean;
  //Filtrado
  filterProduct:string="";

  // public pokemons: any[] = [];
  public page: number = 0;
  public search: string = '';
  public numPagina:number=1;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private subcategoriesService: SubcategoriesService,
    private providersService: ProvidersService,
    private statusService: StatusService,
    private brandService: BrandService,
  ) {
    this.insertarUno=false;
    }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe();

    this.productsService.products$.subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }
  nextPage() {
    this.page += 2;
    this.numPagina+=1;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 2;
    if(this.numPagina>1){
      this.numPagina-=1;
    }
  }

  onSearch( search: string ) {
    this.page = 0;
    this.search = search;
  }
}
