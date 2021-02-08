import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url="https://nestapisd.herokuapp.com/user/login";
  currentUserSubject = new BehaviorSubject<any>(this.localStore.retrieve('token'));
  currentUserObj = this.currentUserSubject.asObservable();
  isLogin = new BehaviorSubject<any>(false);
  isLogin$ = this.isLogin.asObservable();
  constructor(private http: HttpClient,    private localStore: LocalStorageService) { }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
  setIsLogin(value) {
    this.isLogin.next(value);
  }
  login(email:string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}`, { email, password})
    .pipe(
      map(user => {
        this.setToken(user.token);
        this.isLogin.next(true);
        this.currentUserSubject.next(user);
        return user;
    }));
  }
  logout() {
    this.localStore.clear('token');
    this.currentUserSubject.next(null);
  }
  getToken() {
    return this.localStore.retrieve('token');
  }
  setToken(token) {
    this.localStore.store('token', token)
  }
  checkLogin() {
    if(this.getToken()) {
      return true;
    }
    return false;
  }
}
