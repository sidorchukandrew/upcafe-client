import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private isAdmin: boolean = false;
  private isWorker: boolean = false;
  private signedIn: boolean = false;

  constructor() { }

  public isSignedIn(): boolean {
    return this.signedIn;
  }
}
