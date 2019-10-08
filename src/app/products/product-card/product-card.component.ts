import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../products.service';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  authors: string[];
  authorString: string;

  constructor(private productService: ProductsService) {
    this.authors = [];
  }

  ngOnInit() {
    this.product.imageUrl = this.productService.getIconUrl(this.product.productId);
    this.productService.getProductSummary(this.product.productId)
      .pipe(mergeMap(data => {
        this.product.detail = data;
        return forkJoin(this.productService.getAuthors(this.product.detail.authors))
      }))
      .subscribe((authors: string[]) => {
        this.authors = authors;
        this.authorString = this.authors.join(', ');
      })
  }
}
