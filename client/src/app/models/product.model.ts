export interface Category{
  id:number;
  name:string;
}

export interface Product{
  id:string;
  cod_product?:string;
  name:string;
  description:string;
  sleeve_color:string;
  flavor:string;
  presentation:string;
  packaging:string;
  stock:number;
  oferta:number;
  purchase_price:number;
  price:number;
  image:string;
  public_id?:string;
  category_id:number;
  subcategory_id:number;
  brand_id:number;
  provider_id:number;
  status:string;
  subtotal?:number;
  taxes?:number;
}
export interface Product2{
  id:string;
  name:string;
  image:string;
  description:string;
  price:number;
  categoryId:number;
}
export interface CreateProductDTO2 extends Omit<Product2,'id'|'status'>{}

export interface CreateProductDTO extends Omit<Product,'id'>{}

export interface UpdateProductDTO extends Partial<CreateProductDTO>{}
