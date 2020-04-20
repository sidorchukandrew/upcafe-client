import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {

  darkThemeOn: boolean;
  darkThemeOn$: Observable<boolean>;
  subscriptions: Subscription;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.darkThemeOn$ = this.themeService.darkThemeOn$;

    this.subscriptions.add(this.darkThemeOn$.pipe(
      tap(on => this.darkThemeOn = on)
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleTheme() {
    this.themeService.switchTheme();
  }

}
