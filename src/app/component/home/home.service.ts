import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/share/model/product';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  product: Product[] = [];
  isSearch: boolean = false;
  constructor(private http: HttpClient) {}
  getData(url): Observable<any> {
    return this.http.get<any>(url);
  }
}
