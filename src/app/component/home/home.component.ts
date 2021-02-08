import { Component, OnInit } from '@angular/core';
import { Category } from './../../share/model/category';
import { HomeService } from './home.service';
import { Product } from './../../share/model/product';
import { Categories } from './../../share/model/categories';
import { LocalStorageService } from 'ngx-webstorage';
import { AccountService } from 'src/app/core/auth/account.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  url = 'https://nestapisd.herokuapp.com/product';
  productList: Product[] = [];
  filterProduct: Product[] = [];
  loading = false;
  categories: Category[] = Categories;
  constructor(
    private homeService: HomeService,
    private accountService: AccountService,
    private cartService: CartService,
    private localStore: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    if (this.localStore.retrieve('token')) {
      this.accountService.setIsLogin(true);
      this.cartService.setCartItem(this.localStore.retrieve('cartProduct'));
    }
    if (this.homeService.isSearch) {
      this.filterProduct = this.homeService.product;
    }
  }
  getProduct() {
    this.loading = true;
    this.homeService.getData(this.url).subscribe((product) => {
      if (product) {
        product.forEach((p) => {
          this.categories.forEach((c) => {
            if (c.id === p.CategoryId) {
              this.productList.push(p);
              this.filterProduct = this.productList;
              this.homeService.product = this.productList;
            }
          });
        });
        this.loading = false;
      }
    });
  }
  filterList(products) {
    if (products) {
      this.filterProduct = products;
    } else {
      this.filterProduct = this.productList;
    }
  }
}
