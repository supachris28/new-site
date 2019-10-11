import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  private detail: string;
  private title: string;
  private mediaPath: string;
  private mediaCaption: string;
  @Input() private newsItem: any;

  constructor(
    private newsService: NewsService,
  ) { }

  ngOnInit() {
    this.title = this.newsItem.title.rendered;
    console.log(this.newsItem)
    this.newsService.getNewsMedia(this.newsItem.featured_media)
      .subscribe(media => {
        this.mediaPath = media.link;
        this.mediaCaption = media.caption.rendered;
      });
  }

}
