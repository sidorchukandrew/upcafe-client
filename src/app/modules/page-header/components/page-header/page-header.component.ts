import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit, OnDestroy {

  @Input("canGoBack") canGoBack: boolean = true;
  @Input("title") title: string = "";

  private subscriptions: Subscription;

  public darkThemeOn: boolean = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
