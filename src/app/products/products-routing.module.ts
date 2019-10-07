import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSummaryComponent } from './product-summary/product-summary.component';


const routes: Routes = [
  { path: 'products/:productId', component: ProductSummaryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
