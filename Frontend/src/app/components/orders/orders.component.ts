import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../types/product';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders:Order[]=[]
  orderService=inject(OrderService)
  constructor(){
}
ngOnInit(){
  this.orderService.getorders().subscribe((result)=>{
    this.orders=result
    console.log(this.orders)
  })
   

} 
sellingPrice(product: Product) {
  return Math.round(product?.purchasePrice - (product?.purchasePrice * product?.discount) / 100);
}
TotalPrice(order:Order){
  let count=0
  for(let i=0;i<order.items.length;i++){
    const element=order.items[i]
    count+=element.quantity*this.sellingPrice(element.product!) 
  }
  return count
}

 
}