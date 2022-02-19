import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Product} from "../../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) {
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/product`, product).pipe(
      catchError(this.handleError<Product>('addProduct')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
