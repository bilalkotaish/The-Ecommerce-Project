import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent,RouterLink,MatIconModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
wishlistService=inject(WishlistService)
wishlist:Product[]=[]

ngOnInit(){
  this.wishlistService.getWishlist().subscribe(res=>{
    this.wishlist=res
  })
}
}
