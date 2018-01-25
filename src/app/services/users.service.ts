import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { User } from '../interfaces/user';
import { Config } from '../config';


@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<any> {
    return this.httpClient.post(Config.host + 'users', user);
  }

  getUserById(id: string): Observable<any> | any {
    return this.httpClient.get(Config.host + `users?id=${id}`).map((users: User[]) => {
      return users[0] ? users[0] : undefined;
    });
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(Config.host + 'users');
  }

  setUser(id: string, user: User): Observable<any> {
    return this.httpClient.put(Config.host + `users/${id}`, user);
  }

}
