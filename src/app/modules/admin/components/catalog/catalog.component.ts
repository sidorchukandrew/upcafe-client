import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatalogService } from 'src/app/services/catalog.service';
import { CatalogWhole } from 'src/app/models/CatalogWhole';
import { Modifier } from 'src/app/models/Modifier';
import { ModifierList } from 'src/app/models/ModifierList';
import { MenuItem } from 'src/app/models/MenuItem';
import { Subscription } from 'rxjs';
import { CatalogObject } from 'src/app/models/CatalogObject';
import { ThemeService } from 'src/app/services/theme.service';
import { SegmentedControlComponent } from 'src/app/modules/segmented-control/components/segmented-control/segmented-control.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {

  protected catalog: CatalogWhole;
  protected modifiers: Array<Modifier>;
  protected modifierLists: Array<ModifierList>;
  protected menuItems: Array<MenuItem>;
  protected controls: Array<string> = ["Items", "Modifiers", "Lists"];

  protected displayedItems: Array<CatalogObject>;
  private subscriptions: Subscription;

  @ViewChild("selector", {static: false}) selector: SegmentedControlComponent;

  constructor(private catalogService: CatalogService, private themeService: ThemeService,
     private router: Router) { }

  ngOnInit() {

    this.catalogService.loadCatalogIfNotLoadedYet();
    this.subscriptions = new Subscription();

    this.subscriptions.add(this.catalogService.catalog$.subscribe(catalog => {
      this.catalog = catalog;
      this.changeGroupFilter(this.controls[0]);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected changeGroupFilter(filter: string): void {

    if (this.catalog) {

      if (filter == "Items") {

        if (this.menuItems == null) {
          this.menuItems = new Array();

          this.catalog.itemsList.forEach(item => {
            this.menuItems.push({
              name: item.name, description: item.description, price: item.price,
              id: item.id, image: item.image, modifierLists: null, inStock: item.inStock
            });
          });
        }

        this.displayedItems = new Array();
        this.menuItems.forEach(item => {this.displayedItems.push({name: item.name, id: item.id})});

      } else if (filter == "Modifiers") {

        if(this.modifiers == null) {
          this.modifiers = new Array();

          this.catalog.modifierLists.forEach(list => {

            list.modifiers.forEach(modifier => {
              this.modifiers.push({id: modifier.id, image: modifier.image, inStock: modifier.inStock,
                      modifierListId: modifier.modifierListId, name: modifier.name, onByDefault: modifier.onByDefault,
                    price: modifier.price
                  });
            });
          });
        }

        this.displayedItems = new Array();
        this.modifiers.forEach(modifier => { this.displayedItems.push({ name: modifier.name, id: modifier.id }) });

      } else if (filter == "Lists") {

        if(this.modifierLists == null) {
          this.modifierLists = new Array();

          this.catalog.modifierLists.forEach(list => {
            this.modifierLists.push({id: list.id, image: list.image, modifiers: null,
              name: list.name, selectionType: list.selectionType});
          });
        }
        this.displayedItems = new Array();
        this.modifierLists.forEach(list => { this.displayedItems.push({ name: list.name, id: list.id }) });
      }
    }
  }

  protected filterByQuery(query: string) {
    if(this.displayedItems) {
      this.changeGroupFilter(this.selector.getSelectedChoice());
      this.displayedItems = this.displayedItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    }
  }

  protected openItem(item: MenuItem | ModifierList | Modifier): void {
    this.router.navigate(["/admin/cafe/catalog/" + item.id]);
  }
}
