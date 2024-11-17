import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/entities/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:12345/categorias';

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getCategories(): Observable<Category[]> {
    var endPoint = "/all";
    return this.http.get<Category[]>(`${this.baseUrl}${endPoint}`);
  }
  
  // Obtener una categoría por ID
  getCategory(id: string): Observable<any> {
    var endPoint = "/any";
    var requestParam = "?id=";
    return this.http.get<any>(`${this.baseUrl}${endPoint}${requestParam}${id}`);
  }

  // Crear una nueva categoría
  createCategory(data: any): Observable<any> {
    var endPoint = "/add";
    console.log(data);
    return this.http.post<any>(`${this.baseUrl}${endPoint}`, data);
  }

  // Actualizar una categoría existente
  updateCategory(data: any): Observable<any> {
    var endPoint = "/update";
    return this.http.put<any>(`${this.baseUrl}${endPoint}`, data);
  }

  // Eliminar una categoría
  deleteCategory(id: string): Observable<any> {
    var endPoint = "/delete";
    var requestParam = "?id=";
    return this.http.delete<any>(`${this.baseUrl}${endPoint}${requestParam}${id}`);
  }

  // Eliminar todas las categorías
  DeleteAllCategories(): Observable<any> {
    var endPoint = "/delete-all";
    return this.http.delete<any>(`${this.baseUrl}${endPoint}`);
  }
}
