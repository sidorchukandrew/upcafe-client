import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService, ROLE_CUSTOMER, ROLE_STAFF, ROLE_ADMIN } from "src/app/services/authentication.service";
import { User } from "src/app/models/User";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-sign-in-options",
  templateUrl: "./sign-in-options.component.html",
  styleUrls: ["./sign-in-options.component.css"],
})
export class SignInOptionsComponent implements OnInit, OnDestroy {
  public isAdmin: boolean = false;
  public isStaff: boolean = false;
  public isCustomer: boolean = false;
  private subscriptions: Subscription;
  public user: User;
  public userShortName: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.authenticationService.authenticatedUser$
      .subscribe(authenticatedUser => {
        this.user = authenticatedUser;
        this.userShortName = this.user.name.substring(0, this.getIndexOfSpace(this.user.name));
      }));

    this.isAdmin = this.authenticationService.isAdmin();
    this.isStaff = this.authenticationService.isStaff();
    this.isCustomer = this.authenticationService.isCustomer();

    if (this.isCustomer && !this.isStaff && !this.isAdmin) {
      this.authenticationService.signInWithRole(ROLE_CUSTOMER);
      this.router.navigateByUrl("user");
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getIndexOfSpace(name: string): number {
    return name.indexOf(" ");
  }

  public signInAsCustomer(): void {
    this.authenticationService.signInWithRole(ROLE_CUSTOMER);
    this.router.navigateByUrl("user/menu");
  }

  public signInAsStaff(): void {
    this.authenticationService.signInWithRole(ROLE_STAFF);
    this.router.navigateByUrl("staff/orders");
  }

  public signInAsAdmin(): void {
    this.authenticationService.signInWithRole(ROLE_ADMIN);
    this.router.navigateByUrl("admin/cafe");
  }
}
