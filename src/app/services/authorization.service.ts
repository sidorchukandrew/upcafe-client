import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { SocialUser, AuthService } from "angularx-social-login";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthorizationService {
  private signedIn: boolean = false;

  private currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = new User();
    this.currentUser.firstName = "Andrew";
    this.currentUser.lastName = "Sidorchuk";
    this.currentUser.email = "sidorchukandrew@gmail.com";
    this.currentUser.photoUrl = "https://google.com";
  }

  public isSignedIn(): boolean {
    // return this.signedIn;
    return true;
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
      username: username,
      password: password,
    };

    this.http
      .post(environment.backendUrl + "/signin/staff", formData)
      .subscribe();
  }

  public customerSignIn(socialUser: SocialUser): void {
    var customer = new User();

    customer.firstName = socialUser.firstName;
    customer.lastName = socialUser.lastName;
    customer.email = socialUser.email;
    customer.photoUrl = socialUser.photoUrl;

    this.http
      .post(environment.backendUrl + "/signin/customer", customer)
      .subscribe();
  }

  public signOutCustomer(): void {
    this.http.get(environment.backendUrl + "/signout/customer").subscribe();
  }

  public getUser(): User {
    return this.currentUser;
  }
}
