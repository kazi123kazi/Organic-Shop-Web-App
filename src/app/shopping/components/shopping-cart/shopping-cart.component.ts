import { ShoppingCartItem } from '../../../shared/models/shopping-cart-item';
import { Observable, Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  shoppingCartItemCount!: any;
  carts: ShoppingCartItem[] = [];
  cart: any;

  subscription!: Subscription;
  constructor(private shoppingCartService: ShoppingCartService,
  ) {}

  getCartTotalPrice() {
    let sum = 0;
    for (let productId in this.carts)
      sum += this.carts[productId].totalPrice;
    return sum;
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

  async ngOnInit() {

    (await this.shoppingCartService.getCart())
      .valueChanges().subscribe(cart => {
        this.cart = cart

        this.shoppingCartItemCount = 0;
        this.carts=[];
        
        for (let productId in cart?.items) {
          this.shoppingCartItemCount += cart?.items[<any>productId].quantity; //counting no of prod in carts
          this.carts.push(new ShoppingCartItem(cart?.items[<any>productId].product, cart?.items[<any>productId].quantity)); //array of object 

        }
    
      })
  }

  ngOnDestroy() {
    //  this.subscription.unsubscribe();
  }


}
