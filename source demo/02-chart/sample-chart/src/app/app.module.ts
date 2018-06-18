import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PieChartControlComponent } from './pie-chart-control/pie-chart-control.component';

@NgModule({
  declarations: [
    AppComponent,
    PieChartControlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
