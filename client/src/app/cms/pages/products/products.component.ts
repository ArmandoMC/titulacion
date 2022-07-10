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

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private subcategoriesService: SubcategoriesService,
    private providersService: ProvidersService,
    private statusService: StatusService,
    private brandService: BrandService,
  ) {
    // this.cat_seleccionada=this.categoria;
    this.insertarUno=false;
    }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe();

    this.productsService.products$.subscribe((data) => {
      this.products = data;
      console.log(data);
    });
    this.categoriesService.getAll().subscribe((data) => {
      this.categories= data;
      if(this.insertarUno=true){
        this.vectorCat.push('Seleccionar');
        this.categories.forEach((item)=>{
          this.vectorCat.push(item.name);
        })
      }else{
        this.vectorCat=null;
        this.categories.forEach((item)=>{
          this.vectorCat.push(item.name);
        })
      }
      
    });
    this.subcategoriesService.getAll().subscribe((data) => {
      this.subcategories= data;
      console.log('subactegorias recatadas',this.subcategories)
      if(this.insertarUno=true){
        this.vectorSubCat.push('Seleccionar');
        this.subcategories.forEach((item)=>{
          this.vectorSubCat.push(item.name);
        })
      }else{
        this.vectorSubCat=null;
        this.subcategories.forEach((item)=>{
          this.vectorSubCat.push(item.name);
        })
      }
      
    });
    this.brandService.getAll().subscribe((data) => {
      this.brands= data;
      if(this.insertarUno=true){
        this.vectorBrand.push('Seleccionar');
        this.brands.forEach((item)=>{
          this.vectorBrand.push(item.name);
        })
      }else{
        this.vectorBrand=null;
        this.brands.forEach((item)=>{
          this.vectorBrand.push(item.name);
        })
      }
      
    });
    this.providersService.getAll().subscribe((data) => {
      this.providers = data;
      if(this.insertarUno=true){
        this.vectorProv.push('Seleccionar');
        this.providers.forEach((item)=>{
          this.vectorProv.push(item.name);
        })
      }else{
        this.vectorProv=null;
        this.providers.forEach((item)=>{
          this.vectorProv.push(item.name);
        })
      }
    });
  }
  nextPage() {
    this.page += 4;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 4;
  }

  onSearchPokemon( search: string ) {
    this.page = 0;
    this.search = search;
  }

  createProduct(f: NgForm) {
    if (!f.valid) {
    } else {
      // console.log('image:',this.image)
      this.insertarUno=true;
      this.productsService
        .createProductAndUpdateImage(
          this.name,
          this.description,
          this.sleeve_color,
          this.flavor,
          this.presentation,
          this.packaging,
          this.stock,
          this.purchase_price,
          this.price,
          this.image,
          this.category_id,
          this.subcategory_id,
          this.brand_id,
          this.provider_id
        )
        .subscribe((data) => {
          console.log('producto creado:', data);
          this.addForm.resetForm();
          this.cerrarModalAdd();
        });
    }
  }
  edit(id: string) {
    this.insertarUno=false;
    const item = this.products.find((item) => item.id === id);
    if (item) {
      this.id = item.id;
      this.product.cod_product = item.cod_product;
      this.product.name = item.name;
      this.product.description = item.description;
      this.product.sleeve_color = item.sleeve_color;
      this.product.flavor = item.flavor;
      this.product.presentation = item.presentation;
      this.product.packaging = item.packaging;
      this.product.stock = item.stock;
      this.product.purchase_price = item.purchase_price;
      this.product.price = item.price;
      this.product.category_id = item.category_id;
      this.product.subcategory_id = item.subcategory_id;
      this.product.brand_id= item.brand_id;
      this.product.image = item.image;
      this.image_url = item.image;
      this.product.public_id = item.public_id;
      this.product.provider_id = item.provider_id;
      
      const cat=this.categories.find(c=>c.id===this.product.category_id);
      if(cat){
        this.cat_seleccionada=cat.name;
      }
      const subcat=this.subcategories.find(c=>c.id===this.product.subcategory_id);
      if(subcat){
        this.subcat_seleccionada=subcat.name;
      }
      const prov=this.providers.find(pr=>pr.id===this.product.provider_id);
      if(prov){
        this.prov_seleccionado=prov.name;
      }
      const brand=this.brands.find(pr=>pr.id===this.product.brand_id);
      if(brand){
        this.brand_seleccionada=brand.name;
      }
    }
  }
  editProduct(f: NgForm) {
    if (!f.valid) {

    } else {
      this.productsService
        .update(
          this.id,
          this.product.name,
          this.product.description,
          this.product.sleeve_color,
          this.product.flavor,
          this.product.presentation,
          this.product.packaging,
          this.product.stock,
          this.product.purchase_price,
          this.product.price,
          this.image,
          this.image_url,
          this.hayFoto,
          this.product.public_id,
          this.product.category_id,
          this.product.subcategory_id,
          this.product.brand_id,
          this.product.provider_id
        )
        .subscribe((data) => {
          console.log('producto modificado:', data);
          this.editForm.resetForm();
          this.cerrarModalEdit();
        });
    }
  }
  deleteProduct(id: string) {
    this.productsService.detele(id).subscribe(data=>{
      console.log('producto eliminado',data)
    })
    const indice=this.products.findIndex(pro=>pro.id===id);
    if(indice!=-1){
      this.products.splice(indice,1);
    }
  }
  cerrarModalAdd() {
    this.botonCerrarAdd.nativeElement.click();
  }
  cerrarModalEdit() {
    this.botonCerrarEdit.nativeElement.click();
  }
  getUltimoId() {
    this.productsService.getUltimoId().subscribe((data) => {
      console.log('ultimo id rescatado:', data);
      this.codigo = 'P000' + (data.max + 1);
    });
  }
  capturarCategoria(name: string) {
    this.cat_seleccionada=name;
    const cat=this.categories.find(c=>c.name===this.cat_seleccionada);
    if(cat){
      this.product.category_id=cat.id;
    }
  }
  capturarSubCategoria(name: string) {
    this.subcat_seleccionada=name;
    const subcat=this.subcategories.find(c=>c.name===this.subcat_seleccionada);
    if(subcat){
      this.product.subcategory_id=subcat.id;
    }
  }
  capturarProvider(name: string) {
    this.prov_seleccionado=name;
    const prov=this.providers.find(c=>c.name===this.prov_seleccionado);
    if(prov){
      this.product.provider_id=prov.id;
    }
  }
  capturarBrand(name: string) {
    this.brand_seleccionada=name;
    const brand=this.brands.find(c=>c.name===this.brand_seleccionada);
    if(brand){
      this.product.brand_id=brand.id;
    }
  }
  capturarCategoriaAlInsertar(name: string) {
    const cat=this.categories.find(c=>c.name===name);
    if(cat){
      this.category_id=cat.id;
      console.log('id categoria seleccionada:',this.category_id)
    }
  }
  capturarSubCategoriaAlInsertar(name: string) {
    const subcat=this.subcategories.find(c=>c.name===name);
    if(subcat){
      this.subcategory_id=subcat.id;
      console.log('id subcategoria seleccionada:',this.subcategory_id)

    }
  }
  capturarProviderAlInsertar(name: string) {
    const prov=this.providers.find(c=>c.name===name);
    if(prov){
      this.provider_id=prov.id;
      console.log('id provider seleccionado:',this.provider_id)

    }
  }
  capturarBrandAlInsertar(name: string) {
    const brand=this.brands.find(c=>c.name===name);
    if(brand){
      this.brand_id=brand.id;
      console.log('id mrca seleccionada:',this.brand_id)

    }
  }
  
  onSelect(event: Event) {
    const item = event.target as HTMLSelectElement;
    console.log('value :', item.value);
  }
  onPhotoSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.image = file;
      this.hayFoto = 'Si';
      console.log(this.image);
    } else {
      this.hayFoto = 'No';
    }
  }
}
