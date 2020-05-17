import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  private authenticatedUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private hasRoleCustomer: boolean = false;
  private hasRoleStaff: boolean = false;
  private hasRoleAdmin: boolean = false;
  private signedInWithRole: string = "";

  public authenticatedUser$: Observable<User> = this.authenticatedUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {

    if(localStorage.getItem("ACCESS_TOKEN")) {

      // Load the user into main memory
      if(localStorage.getItem("name")) {
        this.authenticatedUser.next( {
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          id: parseInt(localStorage.getItem("id")),
          roles: localStorage.getItem("roles").split(","),
          imageUrl: localStorage.getItem("imageUrl")
        });
      }
    }
  }

  public setSignedInUser(user: User): void {
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("imageUrl", user.imageUrl);
    localStorage.setItem("id", user.id.toString());
    localStorage.setItem("roles", user.roles.toLocaleString());
    this.authenticatedUser.next(user);
  }

  public setAccessToken(token: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
  }

  public getUserFromApi(token: string): Observable<User> {
    return this.http.get<User>("http://localhost:8080/user/me", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
  }

  public signOut(): void{
    this.clearUser();
    this.clearAccessToken();
    this.routeToSignInPage();
 }

  private clearUser(): void {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("id");
    localStorage.removeItem("roles");

    this.authenticatedUser.next(null);
  }

  private clearAccessToken(): void {
    localStorage.removeItem("ACCESS_TOKEN");
  }

  private routeToSignInPage(): void {
    this.router.navigate(["."]);
  }

  public isAdmin(): boolean {
    return this.hasRoleAdmin;
  }

  public isStaff(): boolean {
    return this.hasRoleStaff;
  }

  public isCustomer(): boolean {
    return this.hasRoleCustomer;
  }

  public getRoleSignedInWith(): string {
    return this.signedInWithRole;
  }

  public signInWithRole(role: string): void {
    this.signedInWithRole = role;
  }
}
