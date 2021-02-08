import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/share/model/product';
import { ProductDetailService } from './product-detail.service';
import { CartService } from './../cart/cart.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AccountService } from 'src/app/core/auth/account.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  products = [];
  productId: number;
  qualities: number = 1;
  isAddToCart = false;
  colorList = [
    { id: 1, name: 'bg-primary', color: '#007bff' },
    { id: 2, name: 'bg-danger', color: '#dc3545' },
    { id: 3, name: 'bg-warning', color: '#ffc107' },
    { id: 4, name: 'bg-info', color: '#17a2b8' },
    { id: 5, name: 'bg-success', color: '#28a745' },
  ];
  color = 'grey';
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductDetailService,
    private cartService: CartService,
    private localStore: LocalStorageService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = parseInt(this.activatedRoute.snapshot.params.id);
    console.log(typeof this.productId);

    this.productService.getProductDetail(this.productId).subscribe((p) => {
      if (p) {
        this.product = p;
      }
    });
    if (this.accountService.checkLogin()) {
      this.cartService.setCartItem(this.localStore.retrieve('cartProduct'));
      this.accountService.setIsLogin(true);
    }
  }
  setColor(id) {
    this.colorList = this.colorList.map((c) => {
      if (c.id === id) {
        this.color = c.color;
        return { ...c, isActive: true };
      }
      return { ...c, isActive: false };
    });
  }
  setClass(color) {
    return `${color}`;
  }

  addToCart() {
    if (this.accountService.checkLogin()) {
      this.isAddToCart = true;
      setTimeout(() => {
        this.isAddToCart = !this.isAddToCart;
      }, 1000);
      if (this.localStore.retrieve('cartProduct')) {
        let product = this.localStore.retrieve('cartProduct');
        this.cartService.product = product;
        this.checkElement(this.cartService.product);
      } else {
        this.checkElement(this.cartService.product);
      }
      this.localStore.store('cartProduct', this.cartService.product);
      // let temp = this.cartService.product.find((p) => p.id === this.productId);
      // if (!temp) {
      //   this.cartService.product.push({
      //     id: this.productId,
      //     qualities: this.qualities,
      //   });

      //   this.localStore.store('cartProduct', this.cartService.product);
      // }

      // if (this.qualities !== 1) {
      //   this.cartService.product = this.cartService.product.filter((p) =>
      //     p.id === this.productId ? (p.qualities = this.qualities) : p
      //   );
      // }
      this.cartService.setCartItem(this.cartService.product);

      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
    }
  }
  checkElement(item) {
    let temp = item.find((p) => p.id === this.productId);
    console.log('tem:', temp);

    if (!temp) {
      this.cartService.product.push({
        id: this.productId,
        qualities: this.qualities,
      });
    }
    if (this.qualities !== 1) {
      this.cartService.product = this.cartService.product.filter((p) =>
        p.id === this.productId ? (p.qualities = this.qualities) : p
      );
    }
  }

  decrease() {
    if (this.qualities > 1) {
      this.qualities--;
    }
  }
  increase() {
    this.qualities++;
  }
}
