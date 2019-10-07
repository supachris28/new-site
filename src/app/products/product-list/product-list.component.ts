import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [
    { productId: '9781838983635' },
    { productId: '9781789138740' },
    { productId: '9781838559359' },
  ]
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.products.map(product => {
      this.productService.getImageUrl(product.productId)
        .subscribe(url => product.imageUrl = url);
        this.productService.getProductSummary(product.productId)
          .subscribe(data => product.detail = data);
    })
  }

}
