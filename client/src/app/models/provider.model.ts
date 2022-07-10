
export interface Provider{
  id:number;
  name:string;
  ruc:string;
  address:string;
  phone:string;
  status?:string;
}

export interface CreateProviderDTO extends Omit<Provider,'id'>{}
