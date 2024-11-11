import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ProductCardComponent, CarouselModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    margin: 0,

    items: 1, // Show one image per slide
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true

  }
  bannerImages = [
    { images: ['https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/b1c0f73e61ccfaf5.jpg?q=20'] },
    { images: ['https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/680c305665e3e72a.jpeg?q=20'] },
    { images: ['https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/0e03659c089a3055.jpg?q=20'] },
    { images: ['https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/335e0b9848b3cbe8.jpeg?q=20'] },
    { images: ['https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/b1c0f73e61ccfaf5.jpg?q=20'] },
    { images: ['https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/0fe6fe49c8067766.jpg?q=20'] }
  ];
  NewProducts: Product[] = [];
  FeaturedProducts: Product[] = [];
  wishlistService = inject(WishlistService)
  cartService = inject(CartService)
  customersService = inject(CustomersService)
  constructor() { }

  ngOnInit(){
    this.customersService.getNewProducts().subscribe((result) => {
      this.NewProducts = result;
      console.log(this.NewProducts)

    });

    this.customersService.getfeaturedProducts().subscribe((result) => {
      this.FeaturedProducts = result;
      console.log(this.FeaturedProducts)
    });
  
  }


}

