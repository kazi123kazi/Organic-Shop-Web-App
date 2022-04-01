import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';



@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart!:ShoppingCartItem[];
  @Input('shoppingCartItemCount') shoppingCartItemCount!:any;

  getCartTotalPrice() {
    let sum = 0;
    for (let productId in this.cart)
      sum += this.cart[productId].totalPrice;
    return sum;
  }

  constructor(){ } 
}

