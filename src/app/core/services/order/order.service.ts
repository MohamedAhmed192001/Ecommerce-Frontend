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

  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token == null)
      return '';
    const payload = JSON.parse(atob(token?.split('.')[1]));
    return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-all-orders`);
  }

  placeOrder(order: Order): Observable<any> {
    return this.http.post(`${this.baseUrl}/place-order`, order);
  }

  getUserOrders(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-user-orders/` + userId);
  }

}
