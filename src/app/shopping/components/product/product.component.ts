
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductData } from 'shared/models/app-user';
import { ProductService } from 'shared/services/product-service.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy {

  products: ProductData[] = [];
  filteredProducts: ProductData[] = [];

  category!: any;
  cart: any;
  subscription!: Subscription;

  constructor(private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute) {

    this.productService.getAll().subscribe(res => {
      for (var i = 0; i < res.length; i++) {
        this.filteredProducts[i] = this.products[i] = {
          key: res[i].key,
          title: res[i].payload.val().title,
          price: res[i].payload.val().price,
          category: res[i].payload.val().category,
          imageUrl: res[i].payload.val().imageUrl,
        }
      }

      //after-> change nested subscription later
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;

      });

    });
  }


  async ngOnInit() {
   this.subscription= (await this.shoppingCartService.getCart()).valueChanges()
   .subscribe(cart => this.cart = cart);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
