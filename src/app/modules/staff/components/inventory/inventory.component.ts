import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';
import { CatalogWhole } from 'src/app/models/CatalogWhole';
import { MenuItem } from 'src/app/models/MenuItem';
import { FormControl } from '@angular/forms';
import { tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  darkThemeOn: boolean = false;
  catalog: CatalogWhole;
  changedItems: Set<MenuItem>;
  searchBar: FormControl;
  filteredCatalog: CatalogWhole;

  constructor(private catalogService: CatalogService, private themeService: ThemeService) { }

  ngOnInit() {

    this.changedItems = new Set<MenuItem>();
    this.searchBar = new FormControl();

    this.catalogService.getCatalog().subscribe(catalogResponse => {
      this.catalog = catalogResponse['catalog'];

      var itemsList: MenuItem[] = new Array<MenuItem>();

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
      })

      this.filteredCatalog = {
        itemsList: itemsList,
        modifierLists: null
      }
    });



    this.subscriptions = new Subscription();

    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));

    this.searchBar.valueChanges
      .pipe(
        debounceTime(300),
        tap(query => {
          this.filteredCatalog.itemsList = this.catalog.itemsList.filter(item => {
            return item.name.toLowerCase().includes(query.toLowerCase())
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  clicked($event: MouseEvent) {
    $event.stopPropagation();
  }

  public toggleInStock(item: MenuItem): void {
    item.inStock = !item.inStock;

    this.catalog.itemsList.find(itemInCatalog => item.id == itemInCatalog.id).inStock = item.inStock;
    this.changedItems.add(item);
  }

  public save(): void {
    this.changedItems = new Set<MenuItem>();
  }

  public clearSearch(): void {
    this.searchBar.setValue("");
  }
}
