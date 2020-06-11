import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, ROLE_ADMIN } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.authenticationService.isAdmin()) {
      console.log("You are not authorized to view this page.");
      return this.router.createUrlTree(["user"]);
    }

    if (this.authenticationService.getRoleSignedInWith() != ROLE_ADMIN) {
      console.log("You need to sign in as an admin");
      return this.router.createUrlTree(["roles"]);
    }

    return this.authenticationService.isStaff();
  }
}
