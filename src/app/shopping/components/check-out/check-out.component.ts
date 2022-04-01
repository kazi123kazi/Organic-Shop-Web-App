
import { Subscription, async } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCartItem } from '../../../shared/models/shopping-cart-item';
import { ShoppingCart } from '../../../shared/models/shopping-cart';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  cartSubscription!: Subscription;
  shoppingCartItemCount!:any;
  carts: ShoppingCartItem[] = []; //array of obj-->mapped
  cart!:ShoppingCart;  //firebase obj --> firebase 

  constructor(
        private shoppingCartService: ShoppingCartService
         ) { }



  async ngOnInit() {

    this.cartSubscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe((cart: any) =>{
      this.cart=cart;
      this.shoppingCartItemCount = 0;
      this.carts=[];
      for (let productId in cart?.items) {
        this.shoppingCartItemCount += cart?.items[<any>productId].quantity; //counting no of prod in carts
        this.carts.push(
          new ShoppingCartItem(cart?.items[<any>productId].product,
             cart?.items[<any>productId].quantity)); //array of object 
      }
    });
  
   
  }
  
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }


 

}
