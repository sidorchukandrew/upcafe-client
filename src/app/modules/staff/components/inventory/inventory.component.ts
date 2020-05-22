import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';
import { CatalogWhole } from 'src/app/models/CatalogWhole';
import { MenuItem } from 'src/app/models/MenuItem';

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

  constructor(private catalogService: CatalogService, private themeService: ThemeService) { }

  ngOnInit() {

    this.changedItems = new Set<MenuItem>();

    this.catalogService.getCatalog().subscribe(catalogResponse => {

      this.catalog = catalogResponse['catalog'];
      console.log(this.catalog);
    });
    this.subscriptions = new Subscription();

    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public toggleInStock(item: MenuItem): void {
    item.inStock = !item.inStock;
    this.changedItems.add(item);
    console.log(this.changedItems);
  }

  public save(): void {
    this.changedItems = new Set<MenuItem>();
  }
}
