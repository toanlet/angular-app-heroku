import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/share/model/product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  url='https://nestapisd.herokuapp.com/product';
  constructor(private http: HttpClient) { }
  getProductDetail(id) : Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}
