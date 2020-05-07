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
}
