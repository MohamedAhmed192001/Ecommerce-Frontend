import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirnment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiBaseUrl = `${envirnment.apiUrl}/Categories`


  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/get-all-categories`);
  }
}
