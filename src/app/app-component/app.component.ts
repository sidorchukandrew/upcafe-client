import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialUser } from "angularx-social-login";
import { AuthorizationService } from '../services/authorization.service';

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

  public isSignedIn(): boolean {
    return this.authService.isSignedIn();
  }
}
