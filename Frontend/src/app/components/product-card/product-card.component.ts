import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink,MatIconModule,MatButtonModule,CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
@Input() product!:Product
wishlistService=inject(WishlistService)
cartService=inject(CartService)
productService=inject(ProductService)
get sellingPrice() {
  return Math.round(this.product.purchasePrice - (this.product.purchasePrice * this.product.discount) / 100);
}
addToWishlist(product:Product){
  if(this.isInWishlist(product)){
    this.wishlistService.removeFromWishlist(product._id!).subscribe(result=>{
      this.wishlistService.init()
    })
  }else{
    this.wishlistService.addToWishlist(product._id!).subscribe(res=>{
      this.wishlistService.init()
    })
  }

}
isInWishlist(product:Product){
  const productInWishlist=this.wishlistService.wishlistProduct.find(p=>p._id==product._id)
  return productInWishlist?true:false
}
removeFromWishlist(product:Product){
  this.wishlistService.removeFromWishlist(product._id!).subscribe(result=>{
    this.wishlistService.init()
  })  

}
addtoCart(product: Product) {
  console.log(product)
  if(this.isInCart(product._id!)){
    this.cartService.removeFromCart(product._id!).subscribe(()=>{
      this.cartService.init()
    
  })
  }else{
  this.cartService.addToCart(product._id!,1).subscribe(()=>{
    this.cartService.init()
  })      
  } 
} 

 isInCart(productId: string): boolean {
 

  if (!Array.isArray(this.cartService.cartItems)) {
    console.error("Cart items are not defined or not an array.");
    return false;
  }

  return this.cartService.cartItems.some(item => item.product && item.product._id === productId);
}


}


