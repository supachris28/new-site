import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductsService } from '../products.service';

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
      });
      this.productService.getImageUrl(this.productId)
          .subscribe(imageUrl => {
            this.imageUrl = imageUrl;
          });
  }

}
