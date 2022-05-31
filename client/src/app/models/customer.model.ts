import {User} from './user.model';

export interface Customer{

  id:number;
  name:string;
  lastName:string;
  phone:string;
  user:{
    email:string;
    password:string;
    role?:string;
  }

}

export interface CreateCustomerDTO extends Omit<Customer,'id'>{

}
