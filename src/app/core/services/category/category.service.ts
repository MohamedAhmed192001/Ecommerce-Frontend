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

  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/get-category-by-id/` + categoryId);
  }

  updateCategory(categoryId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/update-category/` + categoryId, formData);
  }

  addcategory(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/add-category/`, formData);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/delete-category/` + categoryId);
}
}
