import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialUser } from "angularx-social-login";
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private signedIn: boolean = false;
  private user: SocialUser;

  constructor(private thirdPartyAuthService: AuthService, private customAuthService: AuthorizationService) { }

  ngOnInit(): void {
    this.thirdPartyAuthService.authState.subscribe((user) => {
      this.user = user;
      if (user != null) {
        this.customAuthService.customerSignIn(this.user);
      }
    });
  }

  signInWithGoogle(): void {
    this.thirdPartyAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.thirdPartyAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.thirdPartyAuthService.signOut();
    this.user = null;
    this.signedIn = false;
  }
}
