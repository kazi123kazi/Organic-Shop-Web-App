import { Component, Input, OnInit } from '@angular/core';
import { ProductData } from '../../models/app-user';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product!: ProductData;
 
  @Input('shopping-cart') shoppingCart:any;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
      this.cartService.addToCart(this.product)
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product)
  }

  
  getQuantity(){

    if(!this.shoppingCart) return 0;
    let item=this.shoppingCart.items[this.product.key];
    return item ?item.quantity:0;
  }

}
