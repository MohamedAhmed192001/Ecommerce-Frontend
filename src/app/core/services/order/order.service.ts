import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirnment } from '../../../../environments/environment';
import { Order} from '../../../shared/models/ResponseDTOs/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = `${envirnment.apiUrl}/Orders`
  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-all-orders`);
  }

  placeOrder(order: Order): Observable<any> {
    return this.http.post(`${this.baseUrl}/place-order`, order);
  }

  getUserOrders(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-user-orders` + userId);
  }

}
