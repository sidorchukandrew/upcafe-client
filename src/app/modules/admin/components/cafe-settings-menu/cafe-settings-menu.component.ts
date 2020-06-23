import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cafe-settings-menu',
  templateUrl: './cafe-settings-menu.component.html',
  styleUrls: ['./cafe-settings-menu.component.css']
})
export class CafeSettingsMenuComponent implements OnInit, OnDestroy {

  public darkThemeOn: boolean = false;
  private susbcriptions: Subscription;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.susbcriptions = new Subscription();
    this.susbcriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
  }

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

}
