import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input("title") title: string;
  @Output("searchQuery") searchEmitter: EventEmitter<string> = new EventEmitter<string>();

  private subscriptions: Subscription;
  public darkThemeOn: boolean = false;
  public searchBar: FormControl;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.searchBar = new FormControl();
    this.subscriptions = new Subscription();

    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));

    this.subscriptions.add(this.searchBar.valueChanges.pipe(
      debounceTime(300),
      tap(query => this.searchEmitter.emit(query))
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public clearSearch(): void {
    this.searchBar.setValue("");
  }

}
