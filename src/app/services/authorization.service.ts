import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private signedIn: boolean = false;

  private currentUser: User;

  constructor(private http: HttpClient) { }

  public isSignedIn(): boolean {
    return this.signedIn;
  }

  public setCurrentUser(user: SocialUser): void {
    this.currentUser = new User();
    this.currentUser.firstName = user.firstName;
    this.currentUser.lastName = user.lastName;
    this.currentUser.email = user.email;
    this.currentUser.photoUrl = user.photoUrl;
  }

  public attemptStaffSignIn(username: string, password: string): void {

    var formData: any = {
      "username": username,
      "password": password
    };

    this.http.post("http://localhost:8080/signin/staff", formData).subscribe();
  }

  public customerSignIn(socialUser: SocialUser): void {
    var customer = new User();

    customer.firstName = socialUser.firstName;
    customer.lastName = socialUser.lastName;
    customer.email = socialUser.email;
    customer.photoUrl = socialUser.photoUrl;

    this.http.post("http://localhost:8080/signin/customer", customer).subscribe();
  }
}
