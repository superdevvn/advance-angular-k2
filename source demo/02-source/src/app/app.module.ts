import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { RoleComponent } from './components/system/role/role.component';
import { UserComponent } from './components/system/user/user.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { ProfitComponent } from './components/finance/profit/profit.component';
import { RevenueComponent } from './components/finance/revenue/revenue.component';
import { ExpenditureComponent } from './components/finance/expenditure/expenditure.component';
import { GridControlComponent } from './common/control/grid-control/grid-control.component';
import { ScheduleControlComponent } from './common/control/schedule-control/schedule-control.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MainComponent } from './components/layout/main/main.component';
import { ApiService } from './common/service/api/api.service';
import { AuthService } from './common/service/auth/auth.service';
import { NotifyService } from './common/service/notify/notify.service';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { CheckboxControlComponent } from './common/control/checkbox-control/checkbox-control.component';
import { ModalService } from './common/service/modal-service.service';
import { ExcelService } from './common/service/excel.service';
import { GridService } from './common/control/grid-control/grid.service';
import { ModalControl } from './common/control/modal-control/modal.control';
import { ModalBodyControl } from './common/control/modal-control/modal-body.control';
import { ModalFooterControl } from './common/control/modal-control/modal-footer.control';

import { TeacherComponent } from './components/configuration/teacher/teacher.component';
import { StudentComponent } from './components/configuration/student/student.component';
import { SubjectComponent } from './components/configuration/subject/subject.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { MaterialModule } from './material.module';
import { LocationComponent } from './components/configuration/location/location.component';
import { DatePipe } from '@angular/common';
import { InputControl } from './common/control/input-control/input.control';
import { DatePickerControl } from './common/control/date-picker-control/date-picker.control';
import { RevenueTypeComponent } from './components/configuration/revenue-type/revenue-type.component';
import { ExpenditureTypeComponent } from './components/configuration/expenditure-type/expenditure-type.component';
import { AutocompleteControl } from './common/control/autocomplete-control/autocomplete.control';
import { UtilityService } from './common/service/utility/utility.service';
import { ScheduleComponent } from './components/course/schedule/schedule.component';
import { SelectControl } from './common/control/select-control/select.control';

let routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'course', component: CourseListComponent },
      { path: 'course-detail/:id', component: CourseDetailComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'opening', component: CourseListComponent },
      { path: 'revenue-type', component: RevenueTypeComponent },
      { path: 'expenditure-type', component: ExpenditureTypeComponent },
      { path: 'subject', component: SubjectComponent },
      { path: 'student', component: StudentComponent },
      { path: 'teacher', component: TeacherComponent },
      { path: 'location', component: LocationComponent },
      { path: 'role', component: RoleComponent },
      { path: 'user', component: UserComponent },
      { path: 'revenue', component: RevenueComponent },
      { path: 'expenditure', component: ExpenditureComponent },
      { path: 'profit', component: ProfitComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InputControl,
    SelectControl,
    DatePickerControl,
    AutocompleteControl,
    ModalControl,
    ModalBodyControl,
    ModalFooterControl,
    RoleComponent,
    UserComponent,
    CourseListComponent,
    CourseDetailComponent,
    ScheduleComponent,
    ProfitComponent,
    RevenueComponent,
    ExpenditureComponent,
    GridControlComponent,
    ScheduleControlComponent,
    SignInComponent,
    MainComponent,
    DashboardComponent,
    CheckboxControlComponent,
    SubjectComponent,
    StudentComponent,
    TeacherComponent,
    LocationComponent,
    RevenueTypeComponent,
    ExpenditureTypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule.forRoot()
  ],
  providers: [
    DatePipe,
    ApiService,
    NotifyService,
    AuthService,
    ModalService,
    ExcelService,
    UtilityService,
    GridService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
