import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GridControlComponent } from './common/control/grid-control/grid-control.component';
import { ScheduleControlComponent } from './common/control/schedule-control/schedule-control.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MainComponent } from './layout/main/main.component';
import { ApiService } from './common/service/api.service';
import { AuthService } from './auth/auth.service';
import { NotifyService } from './common/service/notify.service';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CheckboxControlComponent } from './common/control/checkbox-control/checkbox-control.component';

let routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GridControlComponent,
    ScheduleControlComponent,
    SignInComponent,
    MainComponent,
    DashboardComponent,
    CheckboxControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    ApiService,
    NotifyService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
