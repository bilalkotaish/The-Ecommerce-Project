import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../types/cartItem';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';
import { Router, RouterModule  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule,MatIconModule,RouterModule,FormsModule,MatInputModule,MatButtonModule,MatFormFieldModule,MatSelectModule,ReactiveFormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss' 
})
export class ShoppingCartComponent {
cartService = inject(CartService)
router = inject(Router)
orderService=inject(OrderService)
cartitems: CartItem[] = []
orderform=new FormGroup({
  name:new FormControl('',[Validators.required]),
  address:new FormControl('',[Validators.required]),
  phone:new FormControl('',[Validators.required]),
  email:new FormControl('',[Validators.required,Validators.email]),
  notes:new FormControl(''),
  city:new FormControl('',[Validators.required]),
  state:new FormControl('',[Validators.required]),
  zip:new FormControl('',[Validators.required]),
})  
constructor(){}
ngOnInit() {
  this.cartService.getCart().subscribe({
    next: (items) => {
      this.cartitems = items;
    },
    error: (err) => {
      console.error('Error loading cart:', err);
    }
  });
}
order(){
  console.log(this.orderform.value)
}

get Items() {
  return this.cartitems;
}

addToCart(productId: string, quantity: number) {
  this.cartService.addToCart(productId,quantity).subscribe({
    next: () => {
      this.cartService.getCart().subscribe(items => {
        this.cartitems = items;
      });
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
    }
  });
}

removeFromCart(productId: string) {
  if (!productId) {
    console.error('Invalid product ID');
    return;
  }
  
  this.cartService.removeFromCart(productId).subscribe({
    next: () => {
      this.cartService.getCart().subscribe(items => {
        this.cartitems = items;
      });
    },
    error: (err) => {
      console.error('Error removing from cart:', err);
    }
  });
}
 orderstep:number=0
checkout() {
  this.orderstep=1
  
}
addOrder(){
  console.log(this.orderform.value)
  this.orderstep=2
}

sellingPrice(product: Product) {
  return Math.round(product?.purchasePrice - (product?.purchasePrice * product?.discount) / 100);
}
selectedPaymentMethod:string=''


get TotalPrice() {
  let count=0
 for(let i=0;i<this.cartitems.length;i++){
  const element=this.cartitems[i]
  count+=element.quantity*this.sellingPrice(element.product!) 
 }
 return count
}
get ItemCount() {
  let count=0
  for(let i=0;i<this.cartitems.length;i++){
    const element=this.cartitems[i]
    count+=element.quantity
  }
  return count
 

}

placeorder(){
let order:Order={
  items:this.cartitems,
  total:this.TotalPrice,
  status:"",
  paymentMethod:this.selectedPaymentMethod,
  date:new Date(),
  address: {
    name: this.orderform.value.name,
    address: this.orderform.value.address,
    phone: this.orderform.value.phone,
    city: this.orderform.value.city,
    state: this.orderform.value.state,
    zip: this.orderform.value.zip
  }
}
this.orderService.placeorder(order).subscribe({
  next:()=>{
    alert("order placed")
    this.router.navigate(['/orders'])
  },
  error:(err)=>{
    console.error('Error placing order:', err)
  }
})
this.cartService.init()
this.orderstep=0
console.log(order)
}
}