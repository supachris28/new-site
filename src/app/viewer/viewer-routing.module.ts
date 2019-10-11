import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
  { path: 'viewer', component: CoreComponent, children: [
    { path: 'news', component: NewsComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewerRoutingModule { }
