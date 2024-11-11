import { Component, inject } from '@angular/core';
import { Order } from '../../../types/order';
import { OrderService } from '../../../services/order.service';
import { Product } from '../../../types/product';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterModule,MatButtonModule,MatButtonToggleModule,MatCardModule],
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.scss'
})
export class AdminOrderComponent {
  orders: Order[] = [];
  orderService = inject(OrderService);

  constructor() {}

  ngOnInit() {
    this.orderService.getAdminOrder().subscribe((result) => {
      this.orders = result;
      console.log(this.orders);
    });
  }

  sellingPrice(product: Product) {
    return Math.round(product?.purchasePrice - (product?.purchasePrice * product?.discount) / 100);
  }

  TotalPrice(order: Order) {
    let count = 0;
    for (let i = 0; i < order.items.length; i++) {
      const element = order.items[i];
      count += element.quantity * this.sellingPrice(element.product!);
    }
    return count;
  }

  updateStatus( order: Order, button: any) {
    console.log(button.status)
    this.orderService.updateordersatus(order._id!,button.value).subscribe({
      next:()=>{
        alert("order status updated successfully")
        this.ngOnInit()
        
    }})
    
  }



}
