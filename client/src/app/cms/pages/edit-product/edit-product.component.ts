import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { SubcategoriesService } from '../../../services/subcategories.service';
import { AlertsService } from '../../../services/alerts.service';
import { Category, SubCategory } from 'src/app/models/category.model';
import { BrandService } from 'src/app/services/brand.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { Brand } from 'src/app/models/brand.model';
import { Provider } from 'src/app/models/provider.model';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

  photoSelected: string | ArrayBuffer | null;
  image?: File = new File([], '');
  image_url:string="";

  categories: Category[] = [];
  subcategories: SubCategory[] = [];
  brands: Brand[] = [];

  providers: Provider[] = [];
  cat_seleccionada: string;
  subcat_seleccionada: string;
  prov_seleccionado: string;
  brand_seleccionada: string;
  vectorCat: string[] = [];
  vectorSubCat: string[] = [];
  vectorProv: string[] = [];
  vectorBrand: string[] = [];
  hayFoto:string="No";
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
    subcategory_id: 0,
    brand_id: 0,
    provider_id: 0,
    status: '',
  };
  productId: string | null = null;
  isDisabled:boolean;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private subcategoriesService: SubcategoriesService,
    private providersService: ProvidersService,
    private brandService: BrandService,
    private alertsService: AlertsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isDisabled=true;
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productsService.getProduct(this.productId);
          }
          return [null];
        })
      )
      .subscribe((data) => {
        if (data) {
          this.product.cod_product=data.cod_product;
          this.product.name=data.name;
          this.product.description=data.description;
          this.product.sleeve_color=data.sleeve_color;
          this.product.flavor=data.flavor;
          this.product.presentation=data.presentation;
          this.product.packaging=data.packaging;
          this.product.stock=data.stock;
          this.product.purchase_price=data.purchase_price;
          this.product.price=data.price;
          this.product.image=data.image;
          this.image_url=data.image;
          this.product.public_id=data.public_id;
          this.product.category_id=data.category_id;
          this.product.subcategory_id=data.subcategory_id;
          this.product.brand_id=data.brand_id;
          this.product.provider_id=data.provider_id;

          this.categoriesService.getAll().subscribe((data) => {
            this.categories = data;
            this.categories.forEach((item) => {
              this.vectorCat.push(item.name);
            });
            const cat=this.categories.find(c=>c.id===this.product.category_id);
            if(cat){
              this.cat_seleccionada=cat.name;
            }
          });
          this.subcategoriesService.getAll().subscribe((data) => {
            this.subcategories = data;
            this.subcategories.forEach((item) => {
              this.vectorSubCat.push(item.name);
            });
             
          const subcat=this.subcategories.find(c=>c.id===this.product.subcategory_id);
          if(subcat){
            this.subcat_seleccionada=subcat.name;
          }
          });
          this.brandService.getAll().subscribe((data) => {
            this.brands = data;
            this.brands.forEach((item) => {
              this.vectorBrand.push(item.name);
            });
          const brand=this.brands.find(pr=>pr.id===this.product.brand_id);
          if(brand){
            this.brand_seleccionada=brand.name;
          }
          });
          this.providersService.getAll().subscribe((data) => {
            this.providers = data;
              this.providers.forEach((item) => {
                this.vectorProv.push(item.name);
              });
          const prov=this.providers.find(pr=>pr.id===this.product.provider_id);
          if(prov){
            this.prov_seleccionado=prov.name;
          }
          });
        }
      });
  }

  editProduct(f: NgForm) {
    if (!f.valid || this.product.category_id==0 ||this.product.subcategory_id==0 ||this.product.brand_id==0 ||
       this.product.provider_id==0) {
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    } else {
      this.productsService
        .update(
          this.productId,
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
          this.alertsService.alertaSuccessTop('top-end','success','Producto modificado',false,1500);
          this.router.navigate(['/cms/products']);
        },(()=>{
          this.alertsService.alertaFailTop('top-end','error','Error!!','Error al editar producto',false,1500);
        }));
    }
  }
  deleteProduct() {
    this.alertsService.alertaDelete('Estas seguro?','No podrás revertir los cambios','warning',true,'#3085d6',
    '#d33','Si, eliminar').then((result) => {
      if (result.isConfirmed) {
        this.productsService.detele(this.productId).subscribe(data=>{
          console.log('producto eliminado',data)
          this.alertsService.alertaSuccessTop('top-end','success','Producto eliminado',false,1500);
          this.router.navigate(['/cms/products']);
        },(()=>{
          this.alertsService.alertaFailTop('top-end','error','Error!!','Error al eliminar producto',false,1500);
        }));
      }
    });
    
  }


  onPhotoSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.image = file;
      this.hayFoto="Si";
      console.log(this.image);
    }else{
      this.hayFoto="No";
    }
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
  habilitar(){
    this.isDisabled=false;
  }
}
