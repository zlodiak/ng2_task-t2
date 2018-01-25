import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user';
import { Task } from '../../interfaces/task';
import { GlobalVarsService } from '../../services/global-vars.service';
import { DateService } from '../../services/date.service';
import { TasksService } from '../../services/tasks.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private tasks: Task[] = [];
  private subGetTasks: Subscription;

  private authorizedUser: User;

  constructor(private router: Router,
              private globalVarsService: GlobalVarsService,
              private tasksService: TasksService,
              private dateService: DateService) { }

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
  }

  ngOnDestroy() {
    if(this.subGetTasks) { this.subGetTasks.unsubscribe(); }
  }

  private getTasks(): void {
    this.subGetTasks = this.tasksService.getTasks().subscribe((tasks) => {
      tasks.forEach((q) => {
        q['createdDateHuman'] = this.dateService.fromUnixToHuman(q['createdDateUnix']);
      });
      this.tasks = tasks;
    });
  }

}
