export interface IProduct {
    map: any;
    id: number;
    documentId: string;
  title: string;
  description: string;
    price: number;
  thumbnail: {
    id: number;
    url: string;
  };
  category: {
    id: number;
    title: string;
  };
   qty:number;
   stock:number

}
export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}
export interface Isingup{
  name:"username"|"email"|"password";
  Label:string;
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;

  };
}
export interface Ilogin{
   name: "identifier" | "password";
   Label:string
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface CookieService{
   setToken: (token: string) => void;
  getToken: () => string | undefined;
  removeToken: () => void;
}
export interface InputP {
  name: "title" | "description" | "price" | "category"|"thumbnail"|"stock";
  placeholder?: string;
  type?: "text" | "number" | "file" | "select";
  label: string;
  id: string;
  options?: { label: string; value: string }[];
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    min?: number;  // للرقم
    max?: number;  // للرقم
    fileTypes?: string[]; // للصور
  };
}
export interface ICategory {
  id: number;
  documentId: string;
  title: string;

  iconC?: {
    id: number;
    url: string;
  };

  // 🔥 هذا هو المفتاح
  proudacts?: {
    id: number;
    documentId: string;
  }[];
}

export interface InputC {
  name: "title" | "iconC" ;
  placeholder?: string;
  type?: "text"  | "file" ;
  label: string;
  id: string;
  options?: { label: string; value: string }[];
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    min?: number;  // للرقم
    max?: number;  // للرقم
    fileTypes?: string[]; // للصور
  };
}

export interface Iuser{
  id:number
  username:string;
  email:string;
  role:{
id:number,
type:string
  }
   documentId: string;
  
}
export interface updateU {
  name: "email" | "username";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}