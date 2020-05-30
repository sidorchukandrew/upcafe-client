import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-account-menu',
  templateUrl: './staff-account-menu.component.html',
  styleUrls: ['./staff-account-menu.component.css']
})
export class StaffAccountMenuComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigateByUrl("");
  }
}
