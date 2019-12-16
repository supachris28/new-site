import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NewsService } from 'src/app/shared/services/news.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  private id: number;
  mediaPath: string;
  mediaCaption: string;
  newsItem: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
  ) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.newsService.getNewsItem(this.id)
    .pipe(mergeMap(data => {
      this.newsItem = data;
      return this.newsService.getNewsMedia(this.newsItem.featured_media);
    }))
    .subscribe(media => {
      this.mediaPath = media.media_details.sizes.large.source_url;
      this.mediaCaption = media.caption.rendered;
    });
  }

}
