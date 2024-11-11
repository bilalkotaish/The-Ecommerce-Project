import { Component } from '@angular/core';
import { inject, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrandService } from '../../../services/brand.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Product } from '../../../types/product';
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
     MatTableModule,
    MatSortModule,
     MatPaginatorModule
     ,MatButtonModule,
     RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'name','shortDescription','purchasePrice','discount' ,'action'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productservice=inject(ProductService)
  constructor() {
   
    this.dataSource = new MatTableDataSource([] as any);
  }
  ngOnInit(){
    this.getserverdata();
  }
  private getserverdata() {
    this.productservice.getProduct().subscribe((result) => {
      console.log(result);
      this.dataSource.data = result;

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(id:string){
    console.log(id)
    this.productservice.deleteProductById(id).subscribe((result:any)=>{
      alert("Category Deleted Successfully")
      this.getserverdata();

    })
  }
}
