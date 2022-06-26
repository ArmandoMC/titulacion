
export interface Address{
  id:number;
  address:string;
  city:string;
  state:string;
  country:string;
  postal_code:string;
  user_id:number;
}
export interface CreateAddressDTO extends Omit<Address,'id'>{}
export interface UpdateAddressDTO extends Omit<Address,'id'>{};
