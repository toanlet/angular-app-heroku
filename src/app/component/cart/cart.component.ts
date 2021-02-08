import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/share/model/product';
import { CartService } from './cart.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AccountService } from 'src/app/core/auth/account.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  product: Product;
  productList = [];
  qualities: number;
  totally: number;
  constructor(
    private cartService: CartService,
    private localStore: LocalStorageService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    if (this.localStore.retrieve('cartProduct')) {
      let item = this.localStore.retrieve('cartProduct');
      this.getListProduct(item);
      this.accountService.setIsLogin(true);
    }
  }
  getListProduct(list) {
    list.forEach((product) => {
      this.cartService.getDetailProduct(product.id).subscribe((p) => {
        if (p) {
          this.productList.push({ ...p, qualities: product.qualities });
        }
        this.getTotally();
      });
    });
  }
  getTotally() {
    let sum = 0;
    this.productList.forEach((p) => {
      sum = sum + p.Price * p.qualities;
      return sum;
    });
    this.totally = sum;
  }
  deleteProduct(id) {
    this.productList = this.productList.filter((p) => p.ProductId !== id);
    let product = this.productList.map((p) => {
      return { id: p.ProductId, qualities: p.qualities };
    });
    this.localStore.store('cartProduct', product);
    this.cartService.setCartItem(product);
    this.cartService.product = product;
  }
  decrease(id) {
    this.productList.forEach((p) => {
      if (p.ProductId === id) {
        p.qualities--;
        this.getTotally();
        if (p.qualities < 1) {
          if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            this.deleteProduct(id);
          }
        }
      }
    });
  }
  increase(id) {
    this.productList.forEach((p) => {
      if (p.ProductId === id) {
        p.qualities++;
        this.getTotally();
      }
    });
  }
}
