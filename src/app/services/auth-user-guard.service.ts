import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVarsService } from '../services/global-vars.service';


@Injectable()
export class AuthUserGuardService {

  constructor(private router: Router,
              private globalVarsService: GlobalVarsService) { }

  canActivate() {
    const authorizedUser = this.globalVarsService.getVar('authorizedUser');

    if(!authorizedUser) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
