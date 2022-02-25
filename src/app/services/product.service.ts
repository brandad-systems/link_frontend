import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {ProductRequestModel} from "../../model/product-request.model";
import {CategoryModel} from "../../model/category.model";
import {ConditionListModel} from "../../model/condition-list.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = "http://localhost:8080/api/v1/product";

  constructor(private http: HttpClient) {
  }

  createProduct(product: ProductRequestModel): Observable<ProductRequestModel> {
    return this.http.post<ProductRequestModel>(`${this.baseUrl}`, product).pipe(
      catchError(this.handleError<ProductRequestModel>('addProduct')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }

  getCategories(): Observable<CategoryModel[]>{
    return this.http.get<CategoryModel[]>(`${this.baseUrl}/categories`);
  }

  getConditions(): Observable<ConditionListModel>{
    return this.http.get<ConditionListModel>(`${this.baseUrl}/conditions`);
  }


}
