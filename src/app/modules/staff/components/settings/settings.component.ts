import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private subscriptions: Subscription;
  public darkThemeOn$: Observable<boolean>;
  public colorPack: string;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.darkThemeOn$ = this.themeService.darkThemeOn$;

    this.darkThemeOn$.subscribe(on => {
      (on) ? this.colorPack = 'colored' : this.colorPack = 'blue'
    });
  }

}
