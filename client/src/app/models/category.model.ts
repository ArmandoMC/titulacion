
export interface Category{
  id:number;
  name:string;
  description:string;
  status?:string;
}

export interface CreateCategoryDTO extends Omit<Category,'id'>{}

export interface SubCategory{
  id:number;
  name:string;
  description:string;
  status?:string;
}
export interface CreateSubCategoryDTO extends Omit<SubCategory,'id'>{}

