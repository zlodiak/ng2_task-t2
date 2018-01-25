import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

import { TasksService } from '../../services/tasks.service';
import { GlobalVarsService } from '../../services/global-vars.service';
import { PriorityService } from '../../services/priority.service';
import { UsersService } from '../../services/users.service';

import { User } from '../../interfaces/user';
import { Task } from '../../interfaces/task';
import { Priority } from '../../interfaces/priority';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private authorizedUser: User;
  private priorities: Priority[];
  private selectedPriority: number = 1;
  private selectedOwner: string = '';
  private users: User[] = [];

  private subCreateTask: Subscription;
  private subGetPriorities: Subscription;
  private subGetUsers: Subscription;

  constructor(private matDialog: MatDialog,
              private tasksService: TasksService,
              private usersService: UsersService,
              private priorityService: PriorityService,
              private router: Router,
              private globalVarsService: GlobalVarsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title':      new FormControl('', [Validators.required, Validators.minLength(1)]),
      'desc':       new FormControl('', [Validators.required, Validators.minLength(3)]),
      'owner':      new FormControl('', Validators.required)
    });

    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();

    this.getPriorities();
    this.getUsers();
  }

  ngOnDestroy() {
    if(this.subCreateTask) { this.subCreateTask.unsubscribe(); }
    if(this.subGetPriorities) { this.subGetPriorities.unsubscribe(); }
    if(this.subGetUsers) { this.subGetUsers.unsubscribe(); }
  }

  private getPriorities(): void {
    this.subGetPriorities = this.priorityService.getPriorities().subscribe((priorities) => {
      this.priorities = priorities;
    });
  }

  private getUsers(): void {
    this.subGetUsers = this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });
  }

  private onSubmit(): void {
    const task = {
      title: this.form.value.title,
      author: this.globalVarsService.getAuthorizedUser_().id,
      owner: this.form.value.owner,
      desc: this.form.value.desc,
      priority: this.selectedPriority,
      status: 0,
      createdDateUnix: '' + (Date.now() / 1000)
    };

    this.subCreateTask = this.tasksService.createTask(task).subscribe((resp) => {
      this.router.navigate(['/details/' + resp.id], {queryParams: {
        taskCreateNow: true
      }});

      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: {title: 'Выполнено', message: 'Задание создано'}
      });
    });


  }

}
