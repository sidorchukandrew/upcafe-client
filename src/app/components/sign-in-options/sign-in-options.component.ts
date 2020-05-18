import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
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

    if (this.isCustomer && !this.isStaff && !this.isAdmin)
      this.router.navigateByUrl("user");
  }
}
