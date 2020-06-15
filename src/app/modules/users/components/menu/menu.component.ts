import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';
import { Category } from 'src/app/models/Category';
import { MenuItem } from 'src/app/models/MenuItem';
import { debounceTime, tap } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material';
import { ItemDetailsSheet } from '../item-details-sheet/item-details-sheet.component';

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
  protected filteredMenu: Menu;

  constructor(private themeService: ThemeService, private menuService: MenuService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {

    this.searchBar = new FormControl();
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
    this.subscriptions.add(this.menuService.menu$.subscribe(menu => {
      this.menu = menu;
      this.filteredMenu = menu;
    }));

    this.subscriptions.add(this.searchBar.valueChanges.pipe(
      debounceTime(300),
      tap(change => console.log(change)))
        .subscribe(query => {

          var searchFilteredMenu: Menu = new Menu();
          searchFilteredMenu.categories = new Array<Category>();

          this.selectCategory(this.category);

          this.filteredMenu.categories.forEach(subcategory => {
            console.log("Searching in : ", subcategory);

            subcategory.items.forEach(item => {

              console.log("Checking with item : ", item);

              if(item.name.toLowerCase().includes(query.toLowerCase())) {

                console.log("Match found in the name!");

                var indexOfThisSubCategory = searchFilteredMenu.categories.findIndex(s => s.name == subcategory.name);
                console.log("Checking if this subcategory is already present in the search filtered menu: " + indexOfThisSubCategory);

                if(indexOfThisSubCategory == -1) {
                  var indexOfThisSubCategory = searchFilteredMenu.categories.push({items: new Array<MenuItem>(), name: subcategory.name}) - 1;
                  console.log("Adding new category to search filtered menu : " + subcategory.name + " at position : " + indexOfThisSubCategory);
                  console.log("Here's the search filtered menu : ", searchFilteredMenu);

                  searchFilteredMenu.categories[indexOfThisSubCategory].items.push({
                    description: item.description,
                    id: item.id,
                    image: item.image,
                    inStock: item.inStock,
                    modifierLists: item.modifierLists,
                    name: item.name,
                    price: item.price
                  });
                }

                else {
                  searchFilteredMenu.categories[indexOfThisSubCategory].items.push({
                    description: item.description,
                    id: item.id,
                    image: item.image,
                    inStock: item.inStock,
                    modifierLists: item.modifierLists,
                    name: item.name,
                    price: item.price
                  });
                }

                console.log("Adding item : ", item);
              }
            });
          });

          this.filteredMenu = searchFilteredMenu;
        }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected selectCategory(category: string): void {

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

    else if (category == "All") {
      this.filteredMenu = this.menu;
    }
  }

  protected clearSearch(): void {
    this.searchBar.setValue("");
  }

  protected viewAllCategories() {
    this.category = "All";
    this.filteredMenu = this.menu;
  }

  protected getDollars(price: number): string {
    var priceText: string = price.toString();
    var indexOfDecimal = priceText.indexOf(".");

    if (indexOfDecimal == -1) return priceText;

    return priceText.substr(0, indexOfDecimal);
  }

  protected getCents(price: number): string {
    var priceText: string = price.toString();
    var indexOfDecimal = priceText.indexOf(".");

    if (indexOfDecimal == -1) return "00";

    return priceText.substr(indexOfDecimal + 1, priceText.length).padEnd(2, "0");
  }

  protected showItem(item: MenuItem) {
    var panelClass: string = "panel-with-modifiers";

    this.bottomSheet.open(ItemDetailsSheet, {
      data: {
        bottomSheet: this.bottomSheet,
        item: item
      },
      panelClass: panelClass
    });
  }

}
