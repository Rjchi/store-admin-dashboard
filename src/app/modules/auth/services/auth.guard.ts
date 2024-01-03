import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;

    /**---------------------------------------------
     * | Validamos si actualmente no hay un usuario
     * ---------------------------------------------*/

    if (!currentUser) {
      this.authService.logout();
      return false;
    }

    let token = this.authService.token;

    if (!token) {
      this.authService.logout();
      return false;
    }

    /**---------------------------------------------
     * | Validamos que el token no haya expirado
     * ---------------------------------------------*/

    let expiration = JSON.parse(atob(token.split('.')[1])).exp;

    if (Math.floor(new Date().getTime() / 1000) >= expiration) {
      this.authService.logout();
      return false;
    }

    return true;
  }
}
