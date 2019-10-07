import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private static BASE_STATIC_URL = 'https://static.packt-cdn.com/products';
  private productsCache = {};

  constructor(
    private http: HttpClient,
  ) { }

  private static getSummaryUrl(productId: string) {
    return `${ProductsService.BASE_STATIC_URL}/${productId}/summary`;
  }

  private getCachedProduct(productId: string) {
    return this.productsCache[productId];
  }

  private setCachedProduct(productId: string, product: any) {
    this.productsCache[productId] = product;
  }

  public getProductSummary(productId: string): Observable<any> {
    let cachedProduct = this.getCachedProduct(productId);
    if(cachedProduct) {
      console.log('returning cached summary');
      return of(cachedProduct);
    }

    const getSummary =  this.http.get(ProductsService.getSummaryUrl(productId));
    getSummary.subscribe(data => {
      console.log('getting product summary');
      this.setCachedProduct(productId, data);
    });

    return getSummary;
  }

  public getImageUrl(productId: string): Observable<any> {
    let cachedProduct = this.getCachedProduct(productId);
    if(cachedProduct) {
      console.log('using cached summary for cover image');
      return of(cachedProduct.coverImage);
    }

    const getSummary =  this.http.get(ProductsService.getSummaryUrl(productId));
    return getSummary
      .pipe(map((data: any) => {
        console.log('getting product summary for coverImage')
        this.setCachedProduct(productId, data);
        return data.coverImage;
      }));
  }
}
