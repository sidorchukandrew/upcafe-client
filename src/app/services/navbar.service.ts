import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  menuBarHidden: boolean;

  constructor() {
    this.menuBarHidden = false;
  }
}
