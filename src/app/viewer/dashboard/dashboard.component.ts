import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  news: any[];

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsService.getLatestNews()
      .subscribe(data => {
        this.news = data;
      })
  }

}
