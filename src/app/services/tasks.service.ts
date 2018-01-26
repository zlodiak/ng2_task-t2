import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { Task } from '../interfaces/task';
import { Config } from '../config';


@Injectable()
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<any> {
    return Observable.timer(0, Config.updTasksListMs).flatMap(() => this.httpClient.get(Config.host + `tasks`)).map((r) => {
      // console.log('update tasks list', r);
      return r;
    });
  }

  createTask(task): Observable<any> {
    return this.httpClient.post(Config.host + 'tasks', task);
  }

  getTask(id: number): Observable<any> {
    return this.httpClient.get(Config.host + `tasks/${id}`);
  }

  updateTask(id: number, task: Task): Observable<any> {
    return this.httpClient.put(Config.host + `tasks/${id}`, task);
  }

}
