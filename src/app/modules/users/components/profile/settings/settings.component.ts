import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

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
