import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Task } from '../../interfaces/task';
import { User } from '../../interfaces/user';

import { TasksService } from '../../services/tasks.service';
import { UsersService } from '../../services/users.service';
import { DateService } from '../../services/date.service';
import { PriorityService } from '../../services/priority.service';
import { StatusService } from '../../services/status.service';
import { GlobalVarsService } from '../../services/global-vars.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private subRouteParams: Subscription;
  private subUsers: Subscription;
  private subTasks: Subscription;
  private subPriorities: Subscription;
  private subStatuses: Subscription;
  private subGetAuthorizedUser: Subscription;

  private taskId: number;
  private task: Task;
  private userNames: Object = {};
  private priorityTitles: Object = {};
  private statusTitles: Object = {};
  private authorizedUserId: string | boolean;
  private authorizedUserName: string | boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private tasksService: TasksService,
              private dateService: DateService,
              private statusService: StatusService,
              private globalVarsService: GlobalVarsService,
              private priorityService: PriorityService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.subRouteParams = this.activatedRoute.params.subscribe(params => {
      this.taskId = +params['task_id'];
      this.getUsersNames();
      this.getPriorityTitles();
      this.getStatusesTitles();
    });

    this.subGetAuthorizedUser = this.globalVarsService.getAuthorizedUser().subscribe(
      (user: User) => {
        this.authorizedUserId = user ? user.id : false;
        this.authorizedUserName = user ? user.name : false;
      }
    );
  }

  ngOnDestroy() {
    if(this.subRouteParams) { this.subRouteParams.unsubscribe(); }
    if(this.subUsers) { this.subUsers.unsubscribe(); }
    if(this.subTasks) { this.subTasks.unsubscribe(); }
    if(this.subPriorities) { this.subPriorities.unsubscribe(); }
    if(this.subStatuses) { this.subStatuses.unsubscribe(); }
    if(this.subGetAuthorizedUser) { this.subGetAuthorizedUser.unsubscribe(); }
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

  private getPriorityTitles(): void {
    this.subPriorities = this.priorityService.getPriorities().subscribe((titles) => {
      titles.forEach((t) => {
        this.priorityTitles[t.id] = t.title;
      });
    });
  }

  private getStatusesTitles(): void {
    this.subStatuses = this.statusService.getStatuses().subscribe((titles) => {
      titles.forEach((t) => {
        this.statusTitles[t.id] = t.title;
      });
    });
  }

}
