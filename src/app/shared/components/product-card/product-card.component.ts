import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProductData } from '../../models/app-user';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product!: ProductData;
  @Input('show-actions') showActions = true;
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
  
      let item=this.shoppingCart?.items[this.product.key];
      return item ?item.quantity:0;
    
  }

 
}
