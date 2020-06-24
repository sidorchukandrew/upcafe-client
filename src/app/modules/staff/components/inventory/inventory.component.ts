import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';
import { CatalogWhole } from 'src/app/models/CatalogWhole';
import { MenuItem } from 'src/app/models/MenuItem';
import { FormControl } from '@angular/forms';
import { tap, debounceTime, map } from 'rxjs/operators';
import { ModifierList } from 'src/app/models/ModifierList';
import { CatalogInventoryChange } from 'src/app/models/CatalogInventoryChange';
import { Modifier } from 'src/app/models/Modifier';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  darkThemeOn: boolean = false;
  catalog: CatalogWhole;
  changedStock: CatalogInventoryChange;
  searchBar: FormControl;
  filteredCatalog: CatalogWhole;
  selectedCatalogItemSearch: string = "Items";
  saving: boolean = false;

  constructor(private catalogService: CatalogService, private themeService: ThemeService) { }

  ngOnInit() {

    this.changedStock = {
      items: new Set<MenuItem>(),
      modifiers: new Set<Modifier>()
    }
    this.searchBar = new FormControl();

    this.catalogService.getCatalog().subscribe(catalogResponse => {
      this.catalog = catalogResponse['catalog'];

      var itemsList: MenuItem[] = new Array<MenuItem>();
      var modifierLists: ModifierList[] = new Array<ModifierList>();

      this.catalog.itemsList.forEach(item => {
        itemsList.push({
          name: item.name,
          description: item.description,
          id: item.id,
          image: item.image,
          inStock: item.inStock,
          modifierLists: null,
          price: 0
        })
      });

      this.catalog.modifierLists.forEach(modifierList => {
        modifierLists.push({
          id: modifierList.id,
          image: null,
          modifiers: modifierList.modifiers,
          name: modifierList.name,
          selectionType: ''
        });
      });

      this.filteredCatalog = {
        itemsList: itemsList,
        modifierLists: modifierLists
      }
    });

    this.subscriptions = new Subscription();

    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  public changeSelectedCatalogItemSearch(searchCategory: string): void {
    this.selectedCatalogItemSearch = searchCategory;
  }

  public addToChangedItemStock(item: MenuItem): void {
    // this.catalog.itemsList.find(itemInCatalog => item.id == itemInCatalog.id).inStock = item.inStock;
    this.changedStock.items.add(item);
  }

  public addToChangedModifierStock(modifier: Modifier): void {
    // this.catalog.itemsList.find(itemInCatalog => item.id == itemInCatalog.id).inStock = item.inStock;
    this.changedStock.modifiers.add(modifier);
  }

  public save(): void {

    this.saving = true;
    this.catalogService.updateInventory(this.changedStock)
      .pipe(
        map(updateInventoryResponse => updateInventoryResponse['success']),
        tap(successful => {
          if (successful) this.saving = false;
        })
      ).subscribe(() => {
        this.changedStock = {
          items: new Set<MenuItem>(),
          modifiers: new Set<Modifier>()
        }
      });
  }

  public clearSearch(): void {
    this.searchBar.setValue("");
  }

  public filter(query: string): void {
    if(this.selectedCatalogItemSearch == "Items") {
      this.filteredCatalog.itemsList = this.catalog.itemsList.filter(item => {
        return item.name.toLowerCase().includes(query.toLowerCase())
      });
    }

    else if(this.selectedCatalogItemSearch == "Modifiers") {
      this.filteredCatalog.modifierLists = this.catalog.modifierLists.filter(modifierList => {
        return modifierList.name.toLowerCase().includes(query.toLowerCase())
      });
    }
  }
}
