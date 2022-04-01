import { Router } from '@angular/router';


import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';



@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  
  appUser!: AppUser;
  shoppingCartItemCount!:any;
  constructor(private auth: AuthService,
    private router:Router,
    private shoppingCartService: ShoppingCartService
    ) {  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);

  }
   async ngOnInit(){
     
    this.auth.appUser$.subscribe(appUser => this.appUser=appUser);

    let cart$=  (await this.shoppingCartService.getCart()).valueChanges();
    cart$.subscribe(cart=>{
      this.shoppingCartItemCount=0;
      
      for(let productId in cart?.items){
         this.shoppingCartItemCount+=cart?.items[<any>productId].quantity;
      }
    })
  }

}
