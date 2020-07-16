import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
      private usersService: UsersService,
      private router: Router) { }

  ngOnInit() {
  }

  public delete(): void {
    this.usersService.deleteMe().subscribe(deleteSuccessful => {
      if(deleteSuccessful) {
        this.authenticationService.signOut();
        this.router.navigateByUrl("");
      }
    });
  }

}
