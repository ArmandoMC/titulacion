
export interface Order{
  // id:number;
  // name:string;
  // amount:number;
  // localizator?:string;
  // stripe_id?:string;
  // status?:string;
  id:number;
  customer_id:number;
  address_id:number;
  total:number;
  id_transaccion:string;
  status:string;
  
  
}
export interface CreateOrderDTO extends Omit<Order,'id'>{}
export interface UpdateOrderDTO extends Omit<Order,'id'|'name'|'amount'|'stripe_id'|'localizator'>{}
