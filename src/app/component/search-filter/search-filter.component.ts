import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/share/model/category';
import { Categories } from 'src/app/share/model/categories';
import { Product } from 'src/app/share/model/product';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  @Input() products: Product[];
  @Output() filter: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  categories:Category[] = Categories;
  type: string = 'category'
  constructor() { }

  ngOnInit(): void {
   
  }
  getActive(id) {
    let color: any;
    this.categories = this.categories.map(c => {
     c.id === id ? color = true : color = false;
     return { ...c, isActive: color}
    });
  }
  fillterList(id) {
    if(id) {
      let list :Product[];
      list = this.products.filter(product => product.CategoryId === id);
      this.filter.emit(list);
    }
    
  }
 
}
