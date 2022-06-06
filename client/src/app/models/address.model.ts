
export interface Address{
  id:number;
  name_lastname:string;
  telefono:string;
  address:string;
  city:string;
  state:string;
  country:string;
  postal_code:string;
  user_id:number;
  status?:string;
}
export interface CreateAddressDTO extends Omit<Address,'id'>{}
