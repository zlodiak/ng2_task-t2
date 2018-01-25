import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Priority } from '../interfaces/priority';
import { Config } from '../config';


@Injectable()
export class PriorityService {

  constructor(private httpClient: HttpClient) { }

  getPriorities(): Observable<any> {
    return this.httpClient.get(Config.host + `priorities`);
  }

}
