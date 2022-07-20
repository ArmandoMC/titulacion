import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/alerts.service';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { SubcategoriesService } from '../../../services/subcategories.service';
import { Category, SubCategory } from 'src/app/models/category.model';
import { BrandService } from 'src/app/services/brand.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { Brand } from 'src/app/models/brand.model';
import { Provider } from 'src/app/models/provider.model';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @ViewChild('addForm') addForm: NgForm;

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
  
  providers: Provider[] = [];
  categoria: Category = {
    id: 0,
    name: 'Lacteos',
    description: '',
  };
  
  image_url: string;
  cat_seleccionada: string;
  subcat_seleccionada: string;
  prov_seleccionado: string;
  brand_seleccionada: string;
  vectorCat: string[] = [];
  vectorSubCat: string[] = [];
  vectorProv: string[] = [];
  vectorBrand: string[] = [];
  //Filtrado
  filterProduct: string = '';
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private subcategoriesService: SubcategoriesService,
    private providersService: ProvidersService,
    private brandService: BrandService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
      this.vectorCat.push('Seleccionar');
      this.categories.forEach((item) => {
        this.vectorCat.push(item.name);
      });
    });
    this.subcategoriesService.getAll().subscribe((data) => {
      this.subcategories = data;
      console.log('subactegorias recatadas', this.subcategories);
      this.vectorSubCat.push('Seleccionar');
      this.subcategories.forEach((item) => {
        this.vectorSubCat.push(item.name);
      });
    });
    this.brandService.getAll().subscribe((data) => {
      this.brands = data;
      this.vectorBrand.push('Seleccionar');
      this.brands.forEach((item) => {
        this.vectorBrand.push(item.name);
      });
    });
    this.providersService.getAll().subscribe((data) => {
      this.providers = data;
        this.vectorProv.push('Seleccionar');
        this.providers.forEach((item) => {
          this.vectorProv.push(item.name);
        });
    });
    this.getUltimoId();
  }
  createProduct(f: NgForm) {
    if (!f.valid) {
      this.alertsService.alertaFailTop('top-end','error','Error!!','Formulario no válido',false,1500);
    } else {
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
        .subscribe(() => {
          this.addForm.resetForm();
          this.alertsService.alertaSuccessTop('top-end','success','Producto agregado',false,1500);
          this.router.navigate(['/cms/products']);
        },(()=>{
          this.alertsService.alertaFailTop('top-end','error','Error!!','Error al crear producto',false,1500);
        }));
    }
  }
  getUltimoId() {
    this.productsService.getUltimoId().subscribe((data) => {
      console.log('ultimo id rescatado:', data);
      this.codigo = 'P000' + (data.max + 1);
    });
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
  onPhotoSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.image = file;
      console.log(this.image);
    }
  }
}
