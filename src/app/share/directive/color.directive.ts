import { Directive , ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {
@Input() dynamicColor: string;
@Input() defaultValue: string;
  constructor(private el: ElementRef) {

   }
   @HostListener('mouseover') onMouseOver() {
    this.changeColor(this.dynamicColor || this.defaultValue)
   }
   @HostListener('mouseleave') onMouseLeave() {
    this.changeColor('')
  }
  private changeColor(color:string) {
    this.el.nativeElement.style.color = color
  }
}
