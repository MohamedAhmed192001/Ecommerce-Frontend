import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirnment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${envirnment.apiUrl}/Auth`;

  constructor(private http: HttpClient) { }


  login(data: { email: string, password: string }) : Observable<any>
  {
    return this.http.post(`${this.apiUrl}/LogIn`, data);
  }

  register(data: {
    firstName: string, lastName: string, address: string,
    email: string, password: string, role: string
  }) : Observable<any> {

    return this.http.post(`${this.apiUrl}/Register`, data);

  }

}
