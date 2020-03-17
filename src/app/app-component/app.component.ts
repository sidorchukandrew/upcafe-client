import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialUser } from "angularx-social-login";
import { AuthorizationService } from '../services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UPCafé';


  constructor(private authService: AuthorizationService) { }

  ngOnInit(): void {

  }

  // ngOnDestroy(): void {
  //   if (this.authService.isSignedIn()) {
  //     this.authService.signOutCustomer();
  //   }
  // }

  public isSignedIn(): boolean {
    // this.router.navigate(['/user/menu']);
    return this.authService.isSignedIn();
  }

  public signOutCustomer(): void {
    return this.authService.signOutCustomer();
  }
}
