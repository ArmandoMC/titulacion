
export interface Menu{
  id:number;
  name:string;
  description:string;
  mision?:string;
  vision?:string;
  status?:string;
  created_at?:Date;
}
export interface CreateMenuNosotrosDTO extends Omit<Menu,'id'|'status'|'created_at'>{};
export interface UpdateMenuNosotrosDTO extends Omit<Menu,'id'|'name'|'status'|'created_at'>{};
