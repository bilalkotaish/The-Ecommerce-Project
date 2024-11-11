import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/product';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
http=inject(HttpClient)
wishlistProduct:Product[]=[]
constructor() { }
init(){
  this.getWishlist().subscribe(res=>{
    this.wishlistProduct=res
  })
}
addToWishlist(productId:string){
  return this.http.post<Product[]>(environment.apiUrl+'/customer/wishlist/'+productId,
    {})
}
removeFromWishlist(productId:string){
  return this.http.delete<Product[]>(environment.apiUrl+"/customer/wishlist/"+productId)
} 
 
  getWishlist(){
        return this.http.get<Product[]>(environment.apiUrl+"/customer/wishlist")
      }
}
