import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService, ROLE_CUSTOMER, ROLE_STAFF, ROLE_ADMIN } from "src/app/services/authentication.service";
import { User } from "src/app/models/User";

@Component({
  selector: "app-sign-in-options",
  templateUrl: "./sign-in-options.component.html",
  styleUrls: ["./sign-in-options.component.css"],
})
export class SignInOptionsComponent implements OnInit {
  public isAdmin: boolean = false;
  public isStaff: boolean = false;
  public isCustomer: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdmin();
    this.isStaff = this.authenticationService.isStaff();
    this.isCustomer = this.authenticationService.isCustomer();

    if (this.isCustomer && !this.isStaff && !this.isAdmin) {
      this.authenticationService.signInWithRole(ROLE_CUSTOMER);
      this.router.navigateByUrl("user");
    }
  }

  public signInAsCustomer(): void {
    this.authenticationService.signInWithRole(ROLE_CUSTOMER);
    this.router.navigateByUrl("user");
  }

  public signInAsStaff(): void {
    this.authenticationService.signInWithRole(ROLE_STAFF);
    this.router.navigateByUrl("staff");
  }

  public signInAsAdmin(): void {
    this.authenticationService.signInWithRole(ROLE_ADMIN);
    this.router.navigateByUrl("admin");
  }
}
