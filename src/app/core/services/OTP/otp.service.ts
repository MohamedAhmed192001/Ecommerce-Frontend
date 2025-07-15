import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirnment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private apiUrl = `${envirnment.apiUrl}/Otp`;

  constructor(private http: HttpClient) { }


  sendOtp(email: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/send-otp`, JSON.stringify(email) , {headers: { 'Content-Type': 'application/json' }});
  }

  verifyOtp(verifyData: { email: string, code: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, verifyData);
  }
}
