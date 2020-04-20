import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { CatalogByCategory } from 'src/app/models/CatalogByCategory';
import { Catalog } from 'src/app/models/Catalog';
import { CategoryItem } from 'src/app/models/CategoryItem';
import { VariationData } from 'src/app/models/VariationData';
import { SelectedItemStore } from 'src/app/services/stores/selected-item.store';
import { LoadingService } from 'src/app/services/loading.service';
import { tap, concat } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-eats',
  templateUrl: './eats.component.html',
  styleUrls: ['./eats.component.css']
})
export class EatsComponent implements OnInit, OnDestroy {

  catalog: Catalog;
  private subscriptions: Subscription;

  constructor(private catalogService: CatalogService, private itemStore: SelectedItemStore, private loadingService: LoadingService) {
    this.catalog = { catalogSections: Array<CatalogByCategory>() };

  }

  ngOnInit() {
    this.subscriptions = new Subscription();

    var sandwiches$ = this.catalogService.getCatalog("sandwiches").pipe( tap(section => this.catalog.catalogSections.push(section)));

    var soups$ = this.catalogService.getCatalog("soups").pipe(tap(section => this.catalog.catalogSections.push(section)));

    var pizzas$ = this.catalogService.getCatalog("pizzas").pipe( tap(section => this.catalog.catalogSections.push(section)));

    var loadCatalog$ = this.loadingService.showLoadingUntilComplete(sandwiches$.pipe(concat(soups$, pizzas$)));

    this.subscriptions.add(loadCatalog$.subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadItem(lineItem: CategoryItem, variationData: VariationData): void {
    this.itemStore.setSelectedItem(lineItem, variationData);
  }
}
