import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Config } from '../config';

@Injectable()
export class StatusService {

  constructor(private httpClient: HttpClient) { }

  getStatuses(): Observable<any> {
    return this.httpClient.get(Config.host + `statuses`);
  }

}
