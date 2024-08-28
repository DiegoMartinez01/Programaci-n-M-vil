import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Product } from 'model/Product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return throwError(error);
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error al obtener el producto con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  getCategories(): Observable<string[]> {
    return this.getAllProducts().pipe(
      map(products => {
        const categories = new Set(products.map(product => product.category));
        return Array.from(categories);
      }),
      catchError(error => {
        console.error('Error al obtener categorías:', error);
        return throwError(error);
      })
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`).pipe(
      catchError(error => {
        console.error(`Error al obtener productos para la categoría ${category}:`, error);
        return throwError(error);
      })
    );
  }
}
