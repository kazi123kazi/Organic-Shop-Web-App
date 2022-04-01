import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject, SnapshotAction } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
     return this.db.list('/products').push(product);
  }

  get(productId: any){
    return this.db.object('/products/'+productId).valueChanges(); 
  }

  getAll() : Observable<any>
  {  
    return this.db.list('/products').snapshotChanges();
  }
  
  update(productId : any, product:any){
     return this.db.object('/products/'+productId).update(product); 
  }

  delete(productId: any){
    return this.db.object('/products/'+productId).remove();
  }


}
