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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getUserRole(): string | null{
    var token = localStorage.getItem('token');

    if (!token)
      return null;

    var payload = JSON.parse(atob(token.split('.')[1]));

    return payload["role"] || payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  }

}
