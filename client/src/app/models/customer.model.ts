import {User} from './user.model';

export interface Customer{

  id:number;
  name:string;
  last_name:string;
  dni?:string;
  phone?:string;
  user?:{
    email:string;
    password?:string;
    role?:string;
  }
  confirmation?:boolean;

}

export interface CreateCustomerDTO extends Omit<Customer,'id'|'dni' |'phone'>{

}

export interface CreateCustomerDTOByAdmin extends Omit<Customer,'id'>{

}
export interface UpdateCustomerDTO extends Omit<Customer,'id'>{

}
