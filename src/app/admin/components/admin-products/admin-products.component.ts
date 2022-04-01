import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductData } from 'src/app/shared/models/app-user';
import { ProductService } from 'src/app/shared/services/product-service.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit {

  products:ProductData[]=[];

  displayedColumns: string[] = [ 'title', 'price', 'edit'];
  dataSource!: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {
    // Assign the data to the data source for the table to render
    
  }
  
  ngOnInit(): void {
    
    this.productService.getAll().subscribe(res=>{
      for(var i=0; i<res.length; i++) {
          this.products[i]= {
          key:res[i].key,
          title: res[i].payload.val().title,
          price: res[i].payload.val().price,
          category: res[i].payload.val().category,
          imageUrl: res[i].payload.val().imageUrl,
        }
      }
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
