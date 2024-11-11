import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Order } from '../types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 http=inject(HttpClient)
  constructor() { }
  placeorder(order:Order){
    return this.http.post(`${environment.apiUrl}/customer/order`,order)
  }
  getorders(){
    return this.http.get<Order[]>(`${environment.apiUrl}/customer/order`)
  }
  getAdminOrder(){
    return this.http.get<Order[]>(environment.apiUrl+'/order')
  }
  updateordersatus(orderId: string, status: string) {
  return this.http.post(`${environment.apiUrl}/order/${orderId}`, { status:status });
}

}
