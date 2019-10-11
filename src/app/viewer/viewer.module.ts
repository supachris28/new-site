import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';
import { CoreComponent } from './core/core.component';


@NgModule({
  declarations: [
    CoreComponent,
  ],
  imports: [
    CommonModule,
    ViewerRoutingModule
  ]
})
export class ViewerModule { }
