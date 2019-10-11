import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';
import { CoreComponent } from './core/core.component';
import { NewsComponent } from './news/news.component';


@NgModule({
  declarations: [
    CoreComponent,
    NewsComponent,
  ],
  imports: [
    CommonModule,
    ViewerRoutingModule
  ]
})
export class ViewerModule { }
