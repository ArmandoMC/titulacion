
export interface User{
  id:number;
  email:string;
  password:string;
  password_real?:string;
  role?:string;
  created_at?:Date;
  isLoggedIn:boolean;
}
export interface CreateUserDTO extends Omit<User,'created_at '|'isLoggedIn'>{}
export interface UpdateUserDTO extends Omit<User,'id'|'created_at '|'isLoggedIn'>{}
