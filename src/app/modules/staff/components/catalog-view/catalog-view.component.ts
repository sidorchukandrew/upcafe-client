import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
  styleUrls: ['./catalog-view.component.css']
})
export class CatalogViewComponent implements OnInit, OnDestroy {

  protected darkThemeOn: boolean = false;
  protected searchBar: FormControl;

  private subscriptions: Subscription;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));

    this.searchBar = new FormControl();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected clearSearch(): void {
    this.searchBar.reset();
  }

}
