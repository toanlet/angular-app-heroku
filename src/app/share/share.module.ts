import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorDirective } from './directive/color.directive';



@NgModule({
  declarations: [ColorDirective],
  imports: [
    CommonModule
  ]
})
export class ShareModule { }
