
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Observable, switchMap ,of } from 'rxjs';
import firebase from 'firebase/compat/app';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  // changes subcribe as firebase subscribe need to unsubscribe after destroy so used observable 

  constructor(private afAuth: AngularFireAuth, 
    private route : ActivatedRoute,
     private userService: UserService) 
  { this.user$ = afAuth.authState;
  console.log(this.user$) }

  login() {

    let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/'; 
    //store in local
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<any>{
    return this.user$.pipe(switchMap(user => {
      if(user) return this.userService.get(user.uid);
      return  of(null);
    }));
  }

}
