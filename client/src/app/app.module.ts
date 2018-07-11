import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RecordComponent } from './record/record.component';
import { RecordListComponent } from './record-list/record-list.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { FilterRecordsComponent } from './filter-records/filter-records.component';
import { SortRecordsComponent } from './sort-records/sort-records.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';
import { RecordDetailsComponent } from './record-details/record-details.component';
import { RecordService } from './main/record.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './security/authentication.service';
import { CanActivateAuthGuard } from './security/can-activate-auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'app/security/token-interceptor.service';
import { JwtUtilsService } from 'app/security/jwt-utils.service';
import { UserService } from './main/user.service';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SubjectService } from './main/subject.service';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';

const appRoutes: Routes = [
  { path: 'record/:id', component: RecordDetailsComponent, canActivate:[CanActivateAuthGuard] },
  { path: 'subject/:id', component: SubjectDetailsComponent, canActivate:[CanActivateAuthGuard] },
  { path: 'subject/edit/:id', component: EditSubjectComponent, canActivate:[CanActivateAuthGuard] },
  { path: 'main', component: MainComponent, canActivate:[CanActivateAuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RecordComponent,
    RecordListComponent,
    AddRecordComponent,
    FilterRecordsComponent,
    SortRecordsComponent,
    PageNotFoundComponent,
    MainComponent,
    RecordDetailsComponent,
    LoginComponent,
    SubjectListComponent,
    SubjectComponent,
    SubjectDetailsComponent,
    EditSubjectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    RecordService,
    AuthenticationService,
    CanActivateAuthGuard,
    JwtUtilsService,
    UserService,
    SubjectService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
