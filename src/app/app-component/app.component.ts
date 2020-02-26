import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UPCafé';


  constructor() { }

  ngOnInit(): void {

  }

  signInWithGoogle(): void {
  }

  signInWithFacebook(): void {
  }

  signOut(): void {
  }
}
