import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private static BASE_STATIC_URL = 'https://static.packt-cdn.com/products';
  private static BASE_STATIC_AUTHORS_URL = 'https://static.packt-cdn.com/authors';
  private static  productsCache = {};
  private static  authorsCache = {};

  constructor(
    private http: HttpClient,
  ) { }

  private static getSummaryUrl(productId: string) {
    return `${ProductsService.BASE_STATIC_URL}/${productId}/summary`;
  }

  private getCachedProduct(productId: string) {
    return ProductsService.productsCache[productId];
  }

  private setCachedProduct(productId: string, product: any) {
    ProductsService.productsCache[productId] = product;
  }

  private getCachedAuthor(authorId: string) {
    return ProductsService.authorsCache[authorId];
  }

  private setCachedAuthor(authorId: string, author: any) {
    ProductsService.authorsCache[authorId] = author;
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

  public getImageUrl(productId: string): Observable<string> {
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

  public getIconUrl(productId: string): string {
    return `${ProductsService.BASE_STATIC_URL}/${productId}/cover/smaller`;
  }

  public getAuthors(authors: string[]): Observable<string>[] {
    return authors.map((authorId:string) => {
      let cachedAuthor = this.getCachedAuthor(authorId);
      if(cachedAuthor) {
        console.log('using cached author');
        return of(cachedAuthor);
      }

      const getAuthor = this.http.get(`${ProductsService.BASE_STATIC_AUTHORS_URL}/${authorId}`);
      return getAuthor
        .pipe(map((data: any) => {
          console.log('getting author')
          this.setCachedAuthor(authorId, data.author);
          return data.author;
        }));
    })
  }
}
