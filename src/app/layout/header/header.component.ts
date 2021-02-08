import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { CartService } from 'src/app/component/cart/cart.service';
import { HomeService } from 'src/app/component/home/home.service';
import { AccountService } from 'src/app/core/auth/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  qualities = [];
  isLogin: boolean = false;
  searchText: string;
  constructor(
    private cartService: CartService,
    private accountService: AccountService,
    private router: Router,
    private localService: LocalStorageService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.accountService.isLogin$.subscribe((value) => {
      if (value) {
        this.isLogin = value;
      }
    });
    if (this.localService.retrieve('cartProduct')) {
      this.cartService.setCartItem(this.localService.retrieve('cartProduct'));
    }
    this.cartService.cartItem$.subscribe((value) => {
      if (value) {
        this.qualities = value;
      }
    });
  }

  checkLogin() {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    } else {
      this.accountService.logout();
      this.accountService.setIsLogin(false);
      this.qualities = [];
      this.router.navigate(['/']);
    }
  }
  searchProduct() {
    this.homeService.isSearch = true;
    let p = this.homeService.product.map((p) => {
      if (p.Name.includes(this.searchText)) {
        return p;
      }
    });

    console.log('home product:', p);
  }
}
