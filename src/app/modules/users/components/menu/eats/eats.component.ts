import { Component, OnInit, OnDestroy } from "@angular/core";
import { CatalogService } from "src/app/services/catalog.service";
import { CatalogByCategory } from "src/app/models/CatalogByCategory";
import { Catalog } from "src/app/models/Catalog";
import { CategoryItem } from "src/app/models/CategoryItem";
import { VariationData } from "src/app/models/VariationData";
import { SelectedItemStore } from "src/app/services/stores/selected-item.store";
import { LoadingService } from "src/app/services/loading.service";
import { tap, concat, map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { MenuItem } from 'src/app/models/MenuItem';

@Component({
  selector: "app-eats",
  templateUrl: "./eats.component.html",
  styleUrls: ["./eats.component.css"],
})
export class EatsComponent implements OnInit, OnDestroy {
  catalog: Catalog;
  private subscriptions: Subscription;

  constructor(
    private catalogService: CatalogService,
    private itemStore: SelectedItemStore,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.catalog = { catalogSections: Array<CatalogByCategory>() };

    var sandwiches$ = this.catalogService
      .getCatalogBySection("sandwiches")
      .pipe(
        map((response) => response["items"]),
        tap((section) => {
          var catalogSection: CatalogByCategory = {
            category: "Sandwiches",
            menuItems: section,
          };
          this.catalog.catalogSections.push(catalogSection);
        })
      );

    var soups$ = this.catalogService.getCatalogBySection("soups").pipe(
      map((response) => response["items"]),
      tap((section) => {
        var catalogSection: CatalogByCategory = {
          category: "Soups",
          menuItems: section,
        };
        this.catalog.catalogSections.push(catalogSection);
      })
    );

    var pizzas$ = this.catalogService.getCatalogBySection("pizzas").pipe(
      map((response) => response["items"]),
      tap((section) => {
        var catalogSection: CatalogByCategory = {
          category: "Pizzas",
          menuItems: section,
        };
        this.catalog.catalogSections.push(catalogSection);
      })
    );

    var loadCatalog$ = this.loadingService.showLoadingUntilComplete(
      sandwiches$.pipe(concat(soups$, pizzas$))
    );

    this.subscriptions.add(loadCatalog$.subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadItem(menuItem: MenuItem): void {
    this.itemStore.setSelectedItem(menuItem);
  }
}
