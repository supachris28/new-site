import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private static WP_BASE_PATH = 'https://hub.packtpub.com/wp-json/wp/v2/posts';
  private static newsCache = {};

  constructor(
    private http: HttpClient,
  ) { }

  private getCachedNews(path: string) {
    return NewsService.newsCache[path];
  }

  private setCachedNews(path: string, news: any) {
    NewsService.newsCache[path] = news;
  }

  private static getNewsPath(path: string) {
    return NewsService.WP_BASE_PATH;
  }

  public getLatestNews(path = ''): Observable<any> {
    let cachednews = this.getCachedNews(path);
    if(cachednews) {
      return of(cachednews);
    }

    const news =  this.http.get(NewsService.getNewsPath(path));
    news.subscribe(data => {
      this.setCachedNews(path, data);
    });

    return news;
  }
}
