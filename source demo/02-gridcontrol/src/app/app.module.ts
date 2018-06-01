import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScheduleControlComponent } from './controls/schedule-control/schedule-control.component';
import { DemoScheduleComponent } from './demo/demo-schedule/demo-schedule.component';
import { GridControlComponent } from './controls/grid-control/grid-control.component';
import { DemoGridComponent } from './demo/demo-grid/demo-grid.component';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    ScheduleControlComponent,
    DemoScheduleComponent,
    GridControlComponent,
    DemoGridComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
