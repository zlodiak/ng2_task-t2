import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { UsersService } from '../../services/users.service';
import { GlobalVarsService } from '../../services/global-vars.service';
import { HashService } from '../../services/hash.service';

import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { Config } from '../../config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private subGetUserById: Subscription;

  constructor(private matSnackBar: MatSnackBar,
              private usersService: UsersService,
              private hashService: HashService,
              private matDialog: MatDialog,
              private globalVarsService: GlobalVarsService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnDestroy() {
    if(this.subGetUserById) { this.subGetUserById.unsubscribe(); }
  }

  private onSubmit(): void {
    this.subGetUserById = this.usersService.getUserById(this.form.value.email).subscribe((user) => {
      console.log(user);
      const passwordHash = this.hashService.generate(this.form.value.password);

      if(user && passwordHash === user.password) {
        this.globalVarsService.setVar('authorizedUser', user);
        this.router.navigate(['/list'], {queryParams: {
          authNow: true,
          authId: user.id,
          authName: user.name
        }});
        this.matSnackBar.open('Вы авторизовались', 'OK', {duration: Config.modalDelayMs});
      } else {
        this.matDialog.open(InfoDialogComponent, {
          width: '300px',
          hasBackdrop: true,
          data: {title: 'Ошибка!', message: 'Неверные авторизационные данные'}
        });
      }
    });
  }

}
