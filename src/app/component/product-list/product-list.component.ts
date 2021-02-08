import { Component, OnInit , Input} from '@angular/core';
import { Product } from 'src/app/share/model/product';
import { Router} from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
@Input() products: Product[];
page = 0;
pageSize = 12;
  constructor(private router : Router  ) { }

  ngOnInit(): void {

  }
  navigateDetail (id) {
    this.router.navigateByUrl(`/product/${id}`);
  }
}
