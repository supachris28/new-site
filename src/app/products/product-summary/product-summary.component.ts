import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductsService } from '../products.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss']
})
export class ProductSummaryComponent implements OnInit {

  productId: string;
  detail: string;
  imageUrl: string;
  data: any = {};
  authors: string[];
  authorString: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
  ) {
   }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.productService.getProductSummary(this.productId)
      .subscribe(data => {
        this.data = data;
        this.detail = JSON.stringify(data, undefined, 2);
        forkJoin(this.productService.getAuthors(this.data.authors))
          .subscribe((authors) => {
            this.authors = authors;
            this.authorString = this.authors.join(', ');
          })
     });
      // this.productService.getImageUrl(this.productId)
      //     .subscribe(imageUrl => {
      //       this.imageUrl = imageUrl;
      //     });
      this.imageUrl = this.productService.getIconUrl(this.productId);
    }

}
