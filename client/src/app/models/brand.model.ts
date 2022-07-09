
export interface Brand{
  id:number;
  name:string;
  description:string;
  status?:string;
}

export interface CreateBrandDTO extends Omit<Brand,'id'>{}

