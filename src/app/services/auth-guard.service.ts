import {Injectable} from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {AuthService} from './auth.service';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  // canActivate(route, state: RouterStateSnapshot) {
  //    return this.auth.user$.map(user => {
  //      if (user) {  return true; }

  //      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
  //      return false;
  //    });
  // }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.user$
      .take(1)
      .map(user => !!user)
      .do(isAuthenticated => {
        console.log('is Authenticated:', isAuthenticated);
        if (!isAuthenticated) {
          console.log('access denied');
          this.router.navigate(['/login']);
        }
      });
  }
}
