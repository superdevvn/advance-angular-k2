import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GridControlComponent } from './controls/grid-control/grid-control.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    GridControlComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
