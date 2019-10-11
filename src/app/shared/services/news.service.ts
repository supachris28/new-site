import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private static WP_BASE_PATH = 'https://hub.packtpub.com/wp-json/wp/v2';
  private static newsListCache = {};
  private static newsItemCache = {};

  constructor(
    private http: HttpClient,
  ) { }

  private getCachedNews(path: string) {
    return NewsService.newsListCache[path];
  }

  private setCachedNews(path: string, news: any) {
    NewsService.newsListCache[path] = news;
  }

  private static getNewsListPath(path: string) {
    return `${NewsService.WP_BASE_PATH}/posts`;
  }

  private static getNewsItemPath(id: number) {
    return `${NewsService.getNewsListPath('')}/${id}`;
  }

  private static getNewsMediaItemPath(id: number) {
    return `${NewsService.WP_BASE_PATH}/media/${id}`;
  }

  public getLatestNews(path = ''): Observable<any> {
    let cachednews = this.getCachedNews(path);
    if(cachednews) {
      return of(cachednews);
    }

    const news =  this.http.get(NewsService.getNewsListPath(path));
    news.subscribe(data => {
      this.setCachedNews(path, data);
    });

    return news;
  }

  public getNewsItem(id: number): Observable<any> {
    // let cachednews = this.getCachedNews(path);
    // if(cachednews) {
    //   return of(cachednews);
    // }

    const news =  this.http.get(NewsService.getNewsItemPath(id));
    // news.subscribe(data => {
    //   this.setCachedNews(path, data);
    // });

    return news;
  }

  public getNewsMedia(id: number): Observable<any> {
    // let cachednews = this.getCachedNews(path);
    // if(cachednews) {
    //   return of(cachednews);
    // }

    const news =  this.http.get(NewsService.getNewsMediaItemPath(id));
    // news.subscribe(data => {
    //   this.setCachedNews(path, data);
    // });

    return news;
  }
}
