import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialUser } from "angularx-social-login";
import { AuthorizationService } from '../services/authorization.service';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'UPCafé';
  private subscriptions: Subscription;

  darkThemeOn: boolean;
  darkThemeOn$: Observable<boolean>;

  constructor(private authService: AuthorizationService, private themeService: ThemeService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.darkThemeOn$ = this.themeService.darkThemeOn$;

    this.subscriptions.add(this.darkThemeOn$.pipe(
      tap(on => this.changeStyles(on))
    ).subscribe());


  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  public isSignedIn(): boolean {
    return this.authService.isSignedIn();
  }

  public signOutCustomer(): void {
    return this.authService.signOutCustomer();
  }

  changeStyles(darkThemeOn: boolean) {
    this.darkThemeOn = darkThemeOn;

    (darkThemeOn) ? document.body.style.backgroundColor = "#080808" : document.body.style.backgroundColor = "#f6f6f6";
  }

}
