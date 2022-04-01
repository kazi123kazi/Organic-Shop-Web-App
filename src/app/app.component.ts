
import { Router } from '@angular/router';

import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title="organicShop";
  constructor(private  userServ:UserService ,private auth: AuthService, private router: Router) {
    auth.user$.subscribe(user=>{
         if(user) {
             userServ.save(user);
             let returnUrl=localStorage.getItem('returnUrl');
             if(returnUrl){
               localStorage.removeItem('returnUrl');
               router.navigateByUrl(returnUrl);
             }
             
      }
    });
  }

 
   
  

}
