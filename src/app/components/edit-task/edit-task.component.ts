import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

import { Task } from '../../interfaces/task';
import { User } from '../../interfaces/user';
import { Priority } from '../../interfaces/priority';
import { Status } from '../../interfaces/status';

import { GlobalVarsService } from '../../services/global-vars.service';
import { TasksService } from '../../services/tasks.service';
import { PriorityService } from '../../services/priority.service';
import { StatusService } from '../../services/status.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private task: Task;
  private taskId: number;
  private authorizedUser: User;
  private selectedPriority: number;
  private selectedStatus: number;
  private priorities: Priority[];
  private statuses: Status[];

  private subRouteParams: Subscription;
  private subGetPriorities: Subscription;
  private subGetStatuses: Subscription;
  private subUpdateTask: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private matDialog: MatDialog,
              private tasksService: TasksService,
              private priorityService: PriorityService,
              private router: Router,
              private statusService: StatusService,
              private globalVarsService: GlobalVarsService) { }

  ngOnInit() {
    this.getPriorities();
    this.getStatuses();

    this.subRouteParams = this.activatedRoute.params.subscribe(params => {
      this.getTask(+params['task_id']);
    });

    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
  }

  ngOnDestroy() {
    if(this.subRouteParams) { this.subRouteParams.unsubscribe(); }
    if(this.subGetPriorities) { this.subGetPriorities.unsubscribe(); }
    if(this.subGetStatuses) { this.subGetStatuses.unsubscribe(); }
    if(this.subUpdateTask) { this.subUpdateTask.unsubscribe(); }
  }

  private onSubmit(): void {
    const task = {
      id: this.task.id,
      title: this.form.value.title,
      author: this.task.author,
      owner: this.task.owner,
      desc: this.form.value.desc,
      priority: this.selectedPriority,
      status: this.selectedStatus,
      createdDateUnix: this.task.createdDateUnix
    };

    this.subUpdateTask = this.tasksService.updateTask(task.id, task).subscribe((resp) => {
      this.router.navigate(['/details/' + resp.id]);

      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: {title: 'Выполнено', message: 'Задание обновлено'}
      });
    });
  }

  private getTask(taskId): void {
    this.tasksService.getTask(taskId).subscribe((task) => {
      this.task = task;
      this.selectedPriority = task.priority;
      this.selectedStatus = task.status;
      this.initForm();
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      'title':      new FormControl(this.task.title, [Validators.required, Validators.minLength(1)]),
      'desc':       new FormControl(this.task.desc, [Validators.required, Validators.minLength(3)]),
      'priority':   new FormControl(this.task.priority, Validators.required),
      'status':     new FormControl(this.task.status, Validators.required)
    });
  }

  private getPriorities(): void {
    this.subGetPriorities = this.priorityService.getPriorities().subscribe((priorities) => {
      this.priorities = priorities;
    });
  }

  private getStatuses(): void {
    this.subGetStatuses = this.statusService.getStatuses().subscribe((statuses) => {
      this.statuses = statuses;
    });
  }

}
