import { Component, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit, OnDestroy {

  @Output("categorySelected") categorySelectionEmitter: EventEmitter<string> = new EventEmitter();
  private subscriptions: Subscription;

  public category: string = "All";
  public darkThemeOn: boolean = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public selectCategory(selectedCategory: string) {
    this.category = selectedCategory;
    this.categorySelectionEmitter.emit(selectedCategory);
  }
}
