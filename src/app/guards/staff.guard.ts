import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, ROLE_STAFF } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authenticationService.isCustomer()) {
      console.log("You need to sign in first");
      return this.router.createUrlTree([""]);
    }

    if(!this.authenticationService.isStaff()) {
      console.log("You are not authorized to view this page.");
      return this.router.createUrlTree([""]);
    }

    if (this.authenticationService.getRoleSignedInWith() != ROLE_STAFF) {
      console.log("You need to sign in as a staff member");
      return this.router.createUrlTree(["roles"]);
    }

    return this.authenticationService.isStaff();
  }
}
