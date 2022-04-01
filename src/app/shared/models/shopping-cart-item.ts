import { ProductData } from './app-user';

export class ShoppingCartItem{
    
    constructor(public product:any,public quantity: any){}

    get totalPrice()
    { 
        return this.product.price*this.quantity;
    }

    get quantityCount(){
        return this.quantity;
    }
}