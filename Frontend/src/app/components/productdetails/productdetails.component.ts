import { Component, inject } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule,ProductCardComponent,MatIconModule,MatButtonModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent {
customerservice=inject(CustomersService)
route=inject(ActivatedRoute)
product!:Product
MainImage!:string
similarProduct:Product[]=[]
cartService=inject(CartService)
ngOnInit(){
this.route.params.subscribe((x:any)=>{
  this.getProductDetail(x.id)
  
})

}
getProductDetail(id:string){
  this.customerservice.getProductById(id).subscribe((result)=>{
    this.product=result
    this.MainImage=this.product.images[0]
    this.customerservice.getproducts('',this.product.categoryId,'',-1,'',1,4).subscribe((result)=>{
      this.similarProduct=result;
    })
   
  })
}
changeimage(url:string){
 this.MainImage=url
}
get sellingPrice() {
  return Math.round(this.product.purchasePrice - (this.product.purchasePrice * this.product.discount) / 100);
}
wishlistService=inject(WishlistService)

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
  let productInWishlist=this.wishlistService.wishlistProduct.find(p=>p._id==product._id)
  return productInWishlist?true:false
}
removeFromWishlist(product:Product){
  this.wishlistService.removeFromWishlist(product._id!).subscribe(()=>{
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


 isInCart(productId: string){
  
  if (!Array.isArray(this.cartService.cartItems)) {
    console.error("Cart items are not defined or not an array.");
    return false;
  }

  return this.cartService.cartItems.find(item => item.product && item.product._id === productId);
}

 }