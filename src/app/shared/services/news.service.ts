import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private static WP_BASE_PATH = 'https://hub.packtpub.com/wp-json/wp/v2';
  private static newsListCache = {};
  private static newsItemCache = {};
  private static newsMediaCache = {};
  private static newsMediaThumbnailCache = {};

  constructor(
    private http: HttpClient,
  ) { }

  private getCachedNews(path: string) {
    return NewsService.newsListCache[path];
  }

  private setCachedNews(path: string, news: any) {
    NewsService.newsListCache[path] = news;
  }

  private getCachedNewsItem(id: number) {
    return NewsService.newsItemCache[id];
  }

  private setCachedNewsItem(id: number, newsItem: any) {
    NewsService.newsItemCache[id] = newsItem;
  }

  private getCachedNewsMedia(id: number) {
    return NewsService.newsMediaCache[id];
  }

  private setCachedNewsMedia(id: number, newsMedia: any) {
    NewsService.newsMediaCache[id] = newsMedia;
  }

  private getCachedNewsMediaThumbnail(id: number) {
    return NewsService.newsMediaThumbnailCache[id];
  }

  private setCachedNewsMediaThumbnail(id: number, newsMediaThumbnail: any) {
    NewsService.newsMediaThumbnailCache[id] = newsMediaThumbnail;
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
    let cachednews = this.getCachedNewsItem(id);
    if(cachednews) {
      return of(cachednews);
    }

    const news =  this.http.get(NewsService.getNewsItemPath(id));
    news.subscribe(data => {
      this.setCachedNewsItem(id, data);
    });

    return news;
  }

  public getNewsMedia(id: number): Observable<any> {
    let cachednews = this.getCachedNewsMedia(id);
    if(cachednews) {
      return of(cachednews);
    }

    const media =  this.http.get(NewsService.getNewsMediaItemPath(id));
    media.subscribe(data => {
      this.setCachedNewsMedia(id, data);
    });

    return media;
  }

  public getNewsMediaThumbnailPath(id: number): Observable<string> {
    let cachednews = this.getCachedNewsMediaThumbnail(id);
    if(cachednews) {
      return of(cachednews);
    }

    const media =  this.http.get(NewsService.getNewsMediaItemPath(id))
      .pipe(mergeMap((media: any) => of(media.media_details.sizes.thumbnail.source_url)));
    media.subscribe(data => {
      this.setCachedNewsMediaThumbnail(id, data);
    });

    return media;
  }
}
