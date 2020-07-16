import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/User";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem("ACCESS_TOKEN");
    this.signedInWithRole = localStorage.getItem("SIGNED_IN_AS");
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
    return this.http.get<User>(environment.backendUrl +"/api/v1/users/me");
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
  }

  private clearUser(): void {
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
