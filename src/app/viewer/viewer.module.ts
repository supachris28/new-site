import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';
import { CoreComponent } from './core/core.component';
import { NewsComponent } from './news/news.component';
import { CourseComponent } from './course/course.component';


@NgModule({
  declarations: [
    CoreComponent,
    NewsComponent,
    CourseComponent,
  ],
  imports: [
    CommonModule,
    ViewerRoutingModule
  ]
})
export class ViewerModule { }
