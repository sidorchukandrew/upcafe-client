import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user$: Observable<User> = this.authenticationService.authenticatedUser$;
  isStaff: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.isStaff = this.authenticationService.isStaff();
  }

  public signOut(): void {
    this.authenticationService.signOut();
    this.router.navigateByUrl("");
  }

}
