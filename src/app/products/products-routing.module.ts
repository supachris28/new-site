import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  { path: 'products/:productId', component: ProductSummaryComponent },
  { path: 'products', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
