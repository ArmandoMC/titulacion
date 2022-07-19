
export interface Sugerencias{
  id:number;
  name:string;
  description:string;
  privacidad?:string;
  costos_envio?:string;
  entregas?:string;
  metodo_pago?:string;
  status?:string;
  created_at?:Date;
}
// export interface CreateMenuNosotrosDTO extends Omit<Menu,'id'|'status'|'created_at'>{};
export interface UpdateSugerenciasDTO extends Omit<Sugerencias,'id'|'name'|'status'|'created_at'>{};