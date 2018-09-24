import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {UserService} from '../shared/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router) {}

  // canLoad(route: Route) {
  //   if (this.userService.isLoggedIn()) {
  //     return true;
  //   }
  //   let url = `/${route.path}`;
  //   this.router.navigate(['/login'], {queryParams: {redirectTo: url}});
  //   return this.userService.isLoggedIn;
  // }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/account/login']);
      return false;
    }

    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
