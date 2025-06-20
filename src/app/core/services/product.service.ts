import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envirnment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductCreate } from '../../shared/models/CreateDTOs/product-create';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = `${envirnment.apiUrl}/Products`
  productDto = {name: '', description: '', price: 0, stock: 0, imageFile: File}
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getProductDetails(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/get-product-details/` + id);
  }

  addProduct(product: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-product/`, product);
  }

  editProduct(productId: number, product: FormData): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/update-product/` + productId , product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/` + productId);
  }

  getFeaturedProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-featured-products`);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-products-by-categoryId/` + categoryId);
  }

}
