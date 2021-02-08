import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CoreModule } from './../core/core.module'
@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    NgbModule,
    CoreModule,
    LayoutRoutingModule
  ],
  
})
export class LayoutModule { }
