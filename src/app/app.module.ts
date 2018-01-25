import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  MatButtonModule,
          MatDialogModule,
          MatSnackBarModule,
          MatSelectModule,
          MatInputModule,
          MatSortModule} from '@angular/material';

import { PriorityService } from './services/priority.service';
import { DateService } from './services/date.service';
import { UsersService } from './services/users.service';
import { TasksService } from './services/tasks.service';
import { HashService } from './services/hash.service';
import { GlobalVarsService } from './services/global-vars.service';
import { AuthUserGuardService } from './services/auth-user-guard.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DetailsComponent,
    ListComponent,
    RegistrationComponent,
    LoginComponent,
    InfoDialogComponent,
    NewTaskComponent,
    MyTasksComponent
  ],
  imports: [
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PriorityService,
    AuthUserGuardService,
    DateService,
    GlobalVarsService,
    TasksService,
    UsersService,
    HashService
  ],
  entryComponents: [
    InfoDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
