import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ThemeService {

  private themeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem("UPCAFE_DARK_THEME_ON") == 'true');
  public darkThemeOn$: Observable<boolean> = this.themeSubject.asObservable();

  constructor() {
  }

  switchTheme() {
    localStorage.setItem("UPCAFE_DARK_THEME_ON", !this.themeSubject.value  + "");
    this.themeSubject.next(localStorage.getItem("UPCAFE_DARK_THEME_ON") == 'true')
  }

  public getDarkThemeOn$(): Observable<boolean> {
    return this.darkThemeOn$;
  }
}
