import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirnment } from '../../../../environments/environment';
import { UserCreate } from '../../../shared/models/CreateDTOs/user-create';
import { UpdateUserDto } from '../../../shared/models/UpdateDTOs/update-user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = `${envirnment.apiUrl}/Users`
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-all-users`);
  }

  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-user/` + userId);
  }

  addUser(user: UserCreate): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-user`, user);
  }

  updateUser(userId: string | null, updatedUser: UpdateUserDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-user/` + userId, updatedUser);
  }

  deleteUser(userId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-user/` + userId);
  }

}
