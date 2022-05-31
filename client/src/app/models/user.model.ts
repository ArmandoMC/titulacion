
export interface User{
  id:number;
  email:string;
  password:string;
  role?:string;
  created_at?:Date;
  isLoggedIn:boolean;
}
export interface CreateUserDTO extends Omit<User,'created_at '|'isLoggedIn'>{}
