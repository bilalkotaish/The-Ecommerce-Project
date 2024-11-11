import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CartItem } from '../types/cartItem';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
   http = inject(HttpClient);

  constructor() { }

  init() {
    this.getCart().subscribe({
      next: (res) => {
        this.cartItems = res;
      },
      error: (err) => {
        console.error('Error initializing cart:', err);
      }
    });
  }

  addToCart(productId: string, quantity: number) {
    return this.http.post(environment.apiUrl + '/customer/cart/' + productId, { quantity })
     
  }

  removeFromCart(productId: string) {
    return this.http.delete(environment.apiUrl + '/customer/cart/' + productId)
     
  }

  getCart() {
    return this.http.get<CartItem[]>(environment.apiUrl + '/customer/cart')
      .pipe(
        catchError((error) => {
          console.error('Error fetching cart:', error);
          return throwError(() => new Error('Error fetching cart'));
        })
      );
  }
}