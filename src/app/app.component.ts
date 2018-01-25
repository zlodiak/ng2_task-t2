import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';

import { GlobalVarsService } from './services/global-vars.service';
import { User } from './interfaces/user';
import { Config } from './config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private author: string = Config.author;
  private createdDate: string = Config.createdDate;

  private isOpen: boolean = false;
  private authorizedUserId: string | boolean;
  private authorizedUserName: string | boolean;

  private subGetAuthorizedUser: Subscription;

  constructor(private matDialog: MatDialog,
              private globalVarsService: GlobalVarsService,
              private router: Router) {}

  ngOnInit() {
    this.subGetAuthorizedUser = this.globalVarsService.getAuthorizedUser().subscribe(
      (user: User) => {
        this.authorizedUserId = user ? user.id : false;
        this.authorizedUserName = user ? user.name : false;
      }
    );
  }

  ngOnDestroy() {
    if(this.subGetAuthorizedUser) { this.subGetAuthorizedUser.unsubscribe(); }
  }

  private logout(): void {
    this.globalVarsService.setVar('authorizedUser', undefined);

    this.router.navigate(['/login'], {queryParams: {
      logoutNow: true
    }});

    this.matDialog.open(InfoDialogComponent, {
      width: '300px',
      hasBackdrop: true,
      data: {title: 'Выполнено', message: 'Ваш вышли из системы'}
    });
  }

  private toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  private goTo(path): void {
    if(path === 'profile') {
      this.router.navigate(['/user/' + this.authorizedUserId]);
    }  else {
      this.router.navigate(['/list']);
    }
  }
}
