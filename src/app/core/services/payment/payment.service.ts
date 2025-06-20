import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { envirnment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../../../shared/models/ResponseDTOs/Order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = `${envirnment.apiUrl}/Payments`;
  
  constructor(private http: HttpClient) { }

  // 1. Call backend to create Stripe session
  placeOrderAndPay(orderData: Order): Observable<any>{
    return this.http.post(`${this.baseUrl}/place-and-pay`, orderData);

  }

  

  


}
