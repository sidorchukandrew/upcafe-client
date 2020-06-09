import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';
import { Category } from 'src/app/models/Category';
import { MenuItem } from 'src/app/models/MenuItem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  protected darkThemeOn: boolean = false;
  protected category: string = "Eats";
  private subscriptions: Subscription;
  protected searchBar: FormControl;
  protected menu: Menu;
  protected filteredMenu: Menu;

  constructor(private themeService: ThemeService, private menuService: MenuService) { }

  ngOnInit() {

    this.searchBar = new FormControl();
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
    this.subscriptions.add(this.menuService.menu$.subscribe(menu => {
      this.menu = menu;
      // this.selectCategory("Eats");
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected selectCategory(category: string): void {
    console.log("entered");
    this.category = category;
    this.filteredMenu = new Menu();
    this.filteredMenu.categories = new Array<Category>();

    if (this.category == "Eats") {
      this.menu.categories.forEach(category => {
        if (category.name == "Sandwiches" || category.name == "Pizzas" || category.name == "Soups") {

          let subCategory: Category = {
            name: category.name,
            items: new Array<MenuItem>()
          };

          category.items.forEach(item => subCategory.items.push({
            id: item.id,
            description: item.description,
            image: item.image,
            inStock: item.inStock,
            modifierLists: item.modifierLists,
            name: item.name,
            price: item.price
          }));

          this.filteredMenu.categories.push(subCategory);
        }
      });
    }

    else if (category == "Drinks") {

      this.menu.categories.forEach(category => {
        if (category.name == "Hot Teas" || category.name == "Hot Coffees" || category.name == "Iced Teas"
          || category.name == "Iced Coffees" || category.name == "Soft Drinks" || category.name == "Lemonades"
          || category.name == "Other Drinks") {

          let subCategory: Category = {
            name: category.name,
            items: new Array<MenuItem>()
          };

          category.items.forEach(item => subCategory.items.push({
            id: item.id,
            description: item.description,
            image: item.image,
            inStock: item.inStock,
            modifierLists: item.modifierLists,
            name: item.name,
            price: item.price
          }));

          this.filteredMenu.categories.push(subCategory);
        }
      });
    }

    else if (category == "Snacks") {

      this.menu.categories.forEach(category => {
        if (category.name == "Chips" || category.name == "Candy" || category.name == "Healthy Snacks"
          || category.name == "Other Snacks") {

          let subCategory: Category = {
            name: category.name,
            items: new Array<MenuItem>()
          };

          category.items.forEach(item => subCategory.items.push({
            id: item.id,
            description: item.description,
            image: item.image,
            inStock: item.inStock,
            modifierLists: item.modifierLists,
            name: item.name,
            price: item.price
          }));

          this.filteredMenu.categories.push(subCategory);
        }
      });
    }

    else if (category == "Sweets") {

      this.menu.categories.forEach(category => {
        if (category.name == "Pastries" || category.name == "Ice Cream") {

          let subCategory: Category = {
            name: category.name,
            items: new Array<MenuItem>()
          };

          category.items.forEach(item => subCategory.items.push({
            id: item.id,
            description: item.description,
            image: item.image,
            inStock: item.inStock,
            modifierLists: item.modifierLists,
            name: item.name,
            price: item.price
          }));

          this.filteredMenu.categories.push(subCategory);
        }
      });
    }
  }

  protected clearSearch(): void {
    this.searchBar.setValue("");
  }

  protected viewAllCategories() {
    this.category = "All"
    this.filteredMenu = this.menu;
  }

}
