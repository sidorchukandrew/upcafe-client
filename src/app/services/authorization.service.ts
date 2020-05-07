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

  public constructor(private http: HttpClient) {}
  public attemptSignIn(user: SocialUser): any {
    return this.http.post(environment.backendUrl + "/signin", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photoUrl: user.photoUrl,
    });
  }

  public createUser(user: SocialUser): any {
      return this.http.post(environment.backendUrl + "/signin/create", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photoUrl: user.photoUrl,
      });
  }
}
