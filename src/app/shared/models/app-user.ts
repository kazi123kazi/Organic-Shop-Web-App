export interface AppUser{
    name?:string,
    email?:string,
    isAdmin?: boolean
}


export interface ProductData{
    key: string;
    title: string;
    price: number;
    imageUrl: string;
    category:string
  }