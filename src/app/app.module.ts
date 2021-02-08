import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgxWebstorageModule} from 'ngx-webstorage';
import { LayoutModule } from './layout/layout.module';
import { ComponentModule } from './component/component.module';
import { CoreModule } from "./core/core.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    CoreModule,
    ComponentModule,
    RouterModule.forRoot([
     
    ]),
    NgxWebstorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
 constructor() {
  
 }
}
