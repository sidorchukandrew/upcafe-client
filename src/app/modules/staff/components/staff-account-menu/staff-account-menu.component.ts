import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-staff-account-menu',
  templateUrl: './staff-account-menu.component.html',
  styleUrls: ['./staff-account-menu.component.css']
})
export class StaffAccountMenuComponent implements OnInit {

  public user$: Observable<User>;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user$ = this.authenticationService.authenticatedUser$;
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigateByUrl("");
  }
}
