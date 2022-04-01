import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent{
  
  categories$: Observable<any>;
  @Input('category') category:any;
  constructor(private categoryService: CategoryService,) { 
    this.categories$ = this.categoryService.getAll();
  }
}
