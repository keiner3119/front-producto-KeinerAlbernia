import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:12345/productos';

  constructor(private http: HttpClient) { }

  // Obtener todas los productos
  getProducts(): Observable<Product[]> {
    var endPoint = "/all-actives";
    return this.http.get<Product[]>(`${this.baseUrl}${endPoint}`);
  }

  // Obtener un producto por ID
  getProduct(id: string): Observable<any> {
    var endPoint = "/any";
    var requestParam = "?id=";
    return this.http.get<any>(`${this.baseUrl}${endPoint}${requestParam}${id}`);
  }

  // Crear un nuevo producto
  createProduct(data: any): Observable<any> {
    var endPoint = "/add";
    return this.http.post<any>(`${this.baseUrl}${endPoint}`, data);
  }

  // Actualizar un producto existente
  updateProduct(data: any): Observable<any> {
    var endPoint = "/update";
    return this.http.put<any>(`${this.baseUrl}${endPoint}`, data);
  }

  // Eliminar un producto
  deleteProduct(id: string): Observable<any> {
    var endPoint = "/delete";
    var requestParam = "?id=";
    return this.http.delete<any>(`${this.baseUrl}${endPoint}${requestParam}${id}`);
  }

  // Eliminar todos los productos
  DeleteAllProducts(): Observable<any> {
    var endPoint = "/delete-all";
    return this.http.delete<any>(`${this.baseUrl}${endPoint}`);
  }
}
