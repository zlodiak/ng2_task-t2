import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material';

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

  private userId: string;
  private sortedTasks;
  private tasks: Task[] = [];
  private authorizedUser: User;
  private isShortView: boolean = false;

  private subGetTasks: Subscription;
  private subQueryParams: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private globalVarsService: GlobalVarsService,
              private tasksService: TasksService,
              private dateService: DateService) { }

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
    this.subQueryParams = this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.userId = params['user_id'];
        this.getTasks();
      });
  }

  ngOnDestroy() {
    if(this.subGetTasks) { this.subGetTasks.unsubscribe(); }
    if(this.subQueryParams) { this.subQueryParams.unsubscribe(); }
  }

  private getTasks(): void {
    this.subGetTasks = this.tasksService.getTasks().subscribe((tasks) => {
      let tasksSelected: Task[] = [];

      tasks.forEach((t) => {
        t['createdDateHuman'] = this.dateService.fromUnixToHuman(t['createdDateUnix']);
        if(!this.userId) {
          tasksSelected.push(t);
        } else if(t.owner === this.userId) {
          tasksSelected.push(t);
        }
      });

      this.tasks = tasksSelected;
      this.sortedTasks = this.tasks.slice();
    });
  }

  private sortData(sort: Sort) {
    const data = this.tasks.slice();

    if (!sort.active || sort.direction == '') {
      this.sortedTasks = data;
      return;
    }

    this.sortedTasks = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'createdDateUnix': return compare(+a.createdDateUnix, +b.createdDateUnix, isAsc);
        case 'owner': return compare(+a.owner, +b.owner, isAsc);
        case 'status': return compare(+a.status, +b.status, isAsc);
        case 'priority': return compare(+a.priority, +b.priority, isAsc);
        default: return 0;
      }
    });
  }

  private setViewMode(val): void {
    this.isShortView = val;
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
