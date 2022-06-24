
export interface OrderPayment{
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
  status:string;
  id_transaccion?:string;
  sale_id?:number;
  created_at?:Date;
  token?:string;
  name?:string;
  confirmation?:boolean;
  
  
}
export interface CreateOrderDTO extends Omit<OrderPayment,'id'>{}
export interface UpdateOrderDTO extends Omit<OrderPayment,'id'|'name'|'amount'|'stripe_id'|'localizator'>{}
