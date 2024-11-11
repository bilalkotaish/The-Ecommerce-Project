import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Category } from '../types/category';
import { Brand } from '../types/brands';
import { CartItem } from '../types/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
http=inject(HttpClient)
  constructor() { }
  getNewProducts():Observable<Product[]>{
   return this.http.get<Product[]>(environment.apiUrl+"/customer/New-products")
  }
  getfeaturedProducts():Observable<Product[]>{
    return this.http.get<Product[]>(environment.apiUrl+"/customer/featured-products")
  }
  getCategoryById(id:string){
    return this.http.get<Category>(environment.apiUrl+"/category/"+id)
  }
  getCategories(){
    return this.http.get<Category[]>(environment.apiUrl+"/customer/categories")
  }
  getproducts(searchTerm: string, categoryId: string, sortBy: string, sortOrder: number, brandId: string, page: number, pageSize: number) {
    const url = `${environment.apiUrl}/customer/products?` +
      `searchTerm=${searchTerm}` +
      `&&categoryId=${categoryId}` +
      `&&sortBy=${sortBy}` +
      `&&sortOrder=${sortOrder}` +
      `&&brandId=${brandId}` +
      `&&page=${page}` +
      `&&pageSize=${pageSize}`;
  
    return this.http.get<Product[]>(url);
  }

getBrands(){
    return this.http.get<Brand[]>(environment.apiUrl+"/customer/brands")
  }
getProductById(id:string){
  return this.http.get<Product>(environment.apiUrl+"/customer/product/"+id)
}
getwishlist(){
  return this.http.get<Product[]>(environment.apiUrl+"/customer/wishlist")
}
getCart(){
  return this.http.get<CartItem[]>(environment.apiUrl+"/customer/cart")
}
}