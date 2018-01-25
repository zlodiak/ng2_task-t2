import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Task } from '../interfaces/task';
import { Config } from '../config';


@Injectable()
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<any> {
    return this.httpClient.get(Config.host + `tasks`);
  }

}
