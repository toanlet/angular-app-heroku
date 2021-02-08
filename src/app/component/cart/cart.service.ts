import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/share/model/product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  url = 'https://nestapisd.herokuapp.com/product';
  product = [];
  cartItem = new BehaviorSubject<any>([]);
  cartItem$ = this.cartItem.asObservable();
  constructor(private http: HttpClient) {}
  setCartItem(item) {
    this.cartItem.next(item);
  }

  getDetailProduct(id): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}
