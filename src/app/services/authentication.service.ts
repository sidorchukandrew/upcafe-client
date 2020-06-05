import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/User";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

export const ROLE_CUSTOMER: string = "ROLE_CUSTOMER";
export const ROLE_STAFF: string = "ROLE_STAFF";
export const ROLE_ADMIN: string = "ROLE_ADMIN";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private authenticatedUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private hasRoleCustomer: boolean = false;
  private hasRoleStaff: boolean = false;
  private hasRoleAdmin: boolean = false;
  private signedInWithRole: string = "";
  private accessToken: string = "";

  public authenticatedUser$: Observable<User> = this.authenticatedUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      // TODO: CHANGE HOW ROLES ARE LOADED IN. ANYONE CAN GO INTO LOCAL STORAGE
      //    AND CHANGE THEIR ROLES

      this.accessToken = localStorage.getItem("ACCESS_TOKEN");
      // Load the user into main memory
      if (localStorage.getItem("name")) {
        this.authenticatedUser.next({
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          id: parseInt(localStorage.getItem("id")),
          roles: localStorage.getItem("roles").split(","),
          imageUrl: localStorage.getItem("imageUrl"),
        });

        this.setRolesInMemory(this.authenticatedUser.getValue().roles);

        if(localStorage.getItem("SIGNED_IN_AS")) {
          this.signedInWithRole = localStorage.getItem("SIGNED_IN_AS");
        }
      }
    }
    else {
      this.loadMockData();
    }
  }

  private loadMockData(): void {
    localStorage.setItem("ACCESS_TOKEN", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNTkxMzg0MDUyLCJleHAiOjE1OTIyNDgwNTJ9.NUSs95b5n5JeGY111Fn3R7bdxnMC6Q4_S0EX77R6rv8");
    localStorage.setItem("name", "Andrew Sidorchuk");
    localStorage.setItem("email", "sidorchukandrew@gmail.com");
    localStorage.setItem("roles", "ROLE_CUSTOMER,ROLE_STAFF,ROLE_ADMIN");
    localStorage.setItem("id", "8");
    localStorage.setItem("imageUrl", "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=787298571760394&height=250&width=250&ext=1593976052&hash=AeTeq72lOn1WGJjU");


    this.accessToken = localStorage.getItem("ACCESS_TOKEN");
    // Load the user into main memory
    if (localStorage.getItem("name")) {
      this.authenticatedUser.next({
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        id: parseInt(localStorage.getItem("id")),
        roles: localStorage.getItem("roles").split(","),
        imageUrl: localStorage.getItem("imageUrl"),
      });

      this.setRolesInMemory(this.authenticatedUser.getValue().roles);

      if (localStorage.getItem("SIGNED_IN_AS")) {
        this.signedInWithRole = localStorage.getItem("SIGNED_IN_AS");
      }
    }
  }

  private setRolesInMemory(roles: string[]): void {
    roles.forEach((role) => {
      if (role == ROLE_CUSTOMER) {
        this.hasRoleCustomer = true;
      } else if (role == ROLE_STAFF) {
        this.hasRoleStaff = true;
      } else if (role == ROLE_ADMIN) {
        this.hasRoleAdmin = true;
      }
    });
  }

  public setSignedInUser(user: User): void {

    this.clearRoles();
    this.clearUser();

    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("imageUrl", user.imageUrl);
    localStorage.setItem("id", user.id.toString());
    localStorage.setItem("roles", user.roles.toLocaleString());

    this.setRolesInMemory(user.roles);
    this.authenticatedUser.next(user);
  }

  public setAccessToken(token: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    this.accessToken = token;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public getUserFromApi(): Observable<User> {
    return this.http.get<User>("http://localhost:8080/users/me");
  }

  public signOut(): void {
    this.clearUser();
    this.clearAccessToken();
    this.clearRoles();
    this.authenticatedUser.next(null);
  }

  private clearRoles(): void {
    this.hasRoleCustomer = false;
    this.hasRoleStaff = false;
    this.hasRoleAdmin = false;
    this.signedInWithRole = null;
    localStorage.removeItem("SIGNED_IN_AS");
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
    this.accessToken = null;
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
    localStorage.setItem("SIGNED_IN_AS", role);
    this.signedInWithRole = role;
  }
}
