import { Component, inject } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../types/category';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../../types/brands';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [ProductCardComponent,FormsModule,MatSelectModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent {
  customerservice = inject(CustomersService);
    searchTerm: string=''
    categoryId: string = '';
    sortBy: string = "price";
    sortOrder: number = 1;
    brandId: string = '';
    page: number = 1;
    pageSize: number = 10;
    products: Product[] = []
    brands:Brand[]=[]
    categories:Category[]=[]; 

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.route.queryParams.subscribe((x:any) => {
        this.searchTerm = x.searchTerm || '';
        this.categoryId = x.categoryId || '';
        this.brandId = x.brandId  || '';
      });
     this.getProducts()
    this.customerservice.getCategories().subscribe(result=>{{
      this.categories=result
    }})
    this.customerservice.getBrands().subscribe(result=>{
        this.brands=result
      })
    }
    getProducts(){
      setTimeout(()=>{
    this.customerservice.getproducts( this.searchTerm ?? '',
        this.categoryId ?? '',
        this.sortBy ?? '',
        this.sortOrder ?? 1,
        this.brandId ?? '',
        this.page ?? 1,
        this.pageSize ?? 10
      ).subscribe({
        next: (result) => {
          return this.products = result;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          // Handle error (e.g., show error message to user)
        }
      });},20)
    }
    orderChange(event:any){
      this.sortBy='price',
      this.sortOrder=event;
      this.getProducts()

    }
    next(){
      this.page++;
      this.getProducts()
    }
    previous(){
      this.page--;
      this.getProducts()
    }
    last(){
      this.page=this.products.length/this.pageSize;
      this.getProducts()
    }
   
      
  

  }
