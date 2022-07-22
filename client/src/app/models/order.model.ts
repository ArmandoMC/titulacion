
export interface OrderPayment{
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
  num_factura?:string;
  confirmation?:boolean;
  totalVentas?:number;
  numVentas?:number;
  
  
}
export interface Fecha{
  fechaInicial:Date;
  fechaFinal:Date;
}
export interface CreateOrderDTO extends Omit<OrderPayment,'id'|'status'>{}
export interface UpdateOrderDTO extends Omit<OrderPayment,'id'|'name'|'amount'|'stripe_id'|'localizator'>{}
