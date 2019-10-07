import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductSummaryComponent } from './product-summary/product-summary.component';


@NgModule({
  declarations: [
    ProductSummaryComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
  ]
})
export class ProductsModule { }
