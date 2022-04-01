import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';


@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {


  @Input('cart') cart!: ShoppingCart;
  userId!: any;
  userSubscription!: Subscription;
  shipping: any = {};

  constructor(private router: Router,
    private auth: AuthService,
    private orderService: OrderService) { }

  async placeOrder() {
    
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items
    };

    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])

  }
  async ngOnInit() {
    this.userSubscription= this.auth.user$.subscribe(user=>this.userId=user.uid);
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
