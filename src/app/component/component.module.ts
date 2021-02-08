import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from "./../core/core.module";
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShareModule } from './../share/share.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [HomeComponent, ProductListComponent, ProductComponent, SearchFilterComponent, CartComponent, ProductDetailComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    CoreModule,
    ShareModule,
    ComponentRoutingModule
  ]
})
export class ComponentModule { }
