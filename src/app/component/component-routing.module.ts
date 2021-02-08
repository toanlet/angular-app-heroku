import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardGuard } from './../core/auth/auth-guard.guard';
const routes: Routes = [
  { path:'home', component:HomeComponent},
  { path:'cart', component:CartComponent, canActivate:[AuthGuardGuard] },
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'product/:id', component:ProductDetailComponent},
  { path:'', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
