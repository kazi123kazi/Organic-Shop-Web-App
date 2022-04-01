
import { take } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { async, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductData } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }
  async addToCart(product: ProductData) {
    let cartId = await this.getOrCreateCartId();

    let item$: Observable<any> = this.getItem(cartId, product.key) //onserbavle

    let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key); //object

    //observable se subscribe and object se update 
    item$.pipe(take(1)).subscribe(item => {
      if (item === null) {
        item$$.set({ product: product, quantity: 1 });
        console.log('adding new product to cart');
      } else {
        item$$.update({ quantity: item.quantity + 1 });
        console.log('updating exisiting product '); ``
      }
    });

  }

  async removeFromCart(product: ProductData) {

    let cartId = await this.getOrCreateCartId();

    let item$: Observable<any> = this.getItem(cartId, product.key) //observable

    let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key); //object

    //observable se subscribe and object se update 
    item$.pipe(take(1)).subscribe(item => {

      if (item.quantity != null) {
        item$$.update({ quantity: item.quantity - 1 });
        console.log('updating exisiting product ');
      }
      if (item.quantity === 1) {
        item$$.remove();
        console.log('Removing product from cart');
      }
    });
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private getItem(cartId: any, productId: any) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).valueChanges();
  }

  //prmoise ->used then asynchronous operation
  //to use as a synchrnous use aynch and await 
  private async getOrCreateCartId(): Promise<any> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    if (result.key != null) localStorage.setItem('cartId', result.key);
    return result.key;
  }




}


