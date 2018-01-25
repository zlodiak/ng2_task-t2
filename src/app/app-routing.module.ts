import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { AuthUserGuardService } from './services/auth-user-guard.service';
import { NewTaskComponent } from './components/new-task/new-task.component';
import  {MyTasksComponent } from './components/my-tasks/my-tasks.component';


const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'my_tasks', component: MyTasksComponent, canActivate: [AuthUserGuardService]},
  {path: 'list', component: ListComponent, canActivate: [AuthUserGuardService]},
  {path: 'details/:id_task', component: DetailsComponent, canActivate: [AuthUserGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'new_task', component: NewTaskComponent, canActivate: [AuthUserGuardService]},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
