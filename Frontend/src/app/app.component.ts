import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WishlistService } from './services/wishlist.service';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Ecommerce-Store';
  wishlistservice=inject(WishlistService)
  cartservice=inject(CartService)
  authservice=inject(AuthService)

  ngOnInit(){
    if(this.authservice.isLoggedin){
    this.wishlistservice.init()
    this.cartservice.init()
    }
  }
}
