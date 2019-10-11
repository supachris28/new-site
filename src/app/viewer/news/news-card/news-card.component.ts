import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  private detail: string;
  private title: string;

  @Input() private newsItem: any;

  constructor() { }

  ngOnInit() {
    console.log(this.newsItem);
    this.title = this.newsItem.title.rendered;
  }

}
