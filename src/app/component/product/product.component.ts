import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/share/model/product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [] 
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  selected = 0;
  hovered = 0;
  readonly = false;
  constructor( ) {
  
    
   }

  ngOnInit(): void {
  }

}
