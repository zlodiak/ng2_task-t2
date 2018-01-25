import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';
import { UsersService } from '../../services/users.service';
import { DateService } from '../../services/date.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private subRouteParams: Subscription;
  private subUsers: Subscription;
  private subTasks: Subscription;

  private taskId: number;
  private task: Task;
  private userNames: Object = {};

  constructor(private activatedRoute: ActivatedRoute,
              private tasksService: TasksService,
              private dateService: DateService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.subRouteParams = this.activatedRoute.params.subscribe(params => {
      this.taskId = +params['task_id'];
      console.log(this.taskId);
      this.getUsersNames();
    });
  }

  ngOnDestroy() {
    if(this.subRouteParams) { this.subRouteParams.unsubscribe(); }
    if(this.subUsers) { this.subUsers.unsubscribe(); }
    if(this.subTasks) { this.subTasks.unsubscribe(); }
  }

  private getUsersNames(): void {
    this.subUsers = this.usersService.getUsers().subscribe((users) => {
      users.forEach((u) => {
        this.userNames[u.id] = u.name;
      });
      this.getTask();
    });
  }

  private getTask(): void {
    this.subTasks = this.tasksService.getTask(this.taskId).subscribe((task) => {
      this.task = task;
    });
  }

}
