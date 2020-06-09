import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  protected darkThemeOn: boolean = false;
  protected category: string = "All";
  private subscriptions: Subscription;
  protected searchBar: FormControl;
  protected menu: Menu;

  constructor(private themeService: ThemeService, private menuService: MenuService) { }

  ngOnInit() {

    this.searchBar = new FormControl();
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
    this.subscriptions.add(this.menuService.menu$.subscribe(menu => {
      if(menu == null) {
        this.menuService.loadMenuFromApi();
      } else {
        this.menu = menu;
      }
    }));

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected selectCategory(category: string): void {
    this.category = category;
  }

  protected clearSearch(): void {
    this.searchBar.setValue("");
  }

}
