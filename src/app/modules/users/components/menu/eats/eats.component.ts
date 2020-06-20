import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { CatalogService } from "src/app/services/catalog.service";
import { CatalogByCategory } from "src/app/models/CatalogByCategory";
import { Catalog } from "src/app/models/Catalog";
import { SelectedItemStore } from "src/app/stores/selected-item.store";
import { LoadingService } from "src/app/services/loading.service";
import { tap, concat, map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { MenuItem } from 'src/app/models/MenuItem';
import { MatBottomSheet, MatDialog } from '@angular/material';

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
    private loadingService: LoadingService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {

    this.subscriptions = new Subscription();
    this.catalog = { catalogSections: Array<CatalogByCategory>() };

    // var sandwiches$ = this.catalogService
    //   .getCatalogBySection("sandwiches")
    //   .pipe(
    //     map((response) => response["items"]),
    //     tap((section) => {
    //       var catalogSection: CatalogByCategory = {
    //         category: "Sandwiches",
    //         menuItems: section,
    //       };
    //       this.catalog.catalogSections.push(catalogSection);
    //     })
    //   );

    // var soups$ = this.catalogService.getCatalogBySection("soups").pipe(
    //   map((response) => response["items"]),
    //   tap((section) => {
    //     var catalogSection: CatalogByCategory = {
    //       category: "Soups",
    //       menuItems: section,
    //     };
    //     this.catalog.catalogSections.push(catalogSection);
    //   })
    // );

    // var pizzas$ = this.catalogService.getCatalogBySection("pizzas").pipe(
    //   map((response) => response["items"]),
    //   tap((section) => {
    //     var catalogSection: CatalogByCategory = {
    //       category: "Pizzas",
    //       menuItems: section,
    //     };
    //     this.catalog.catalogSections.push(catalogSection);
    //   })
    // );

    // var loadCatalog$ = this.loadingService.showLoadingUntilComplete(
    //   sandwiches$.pipe(concat(soups$, pizzas$))
    // );

    // this.subscriptions.add(loadCatalog$.subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public loadItem(menuItem: MenuItem): void {
    this.itemStore.setSelectedItem(menuItem);
  }

  public openBottomSheet(item: MenuItem): void {

    var panelClass: string;

    item.modifierLists.length > 0 ? panelClass = "panel-with-modifiers" : panelClass = "panel-without-modifiers";

    // this.bottomSheet.open(ItemDetailsSheet, {
    //   data: {bottomSheet: this.bottomSheet,
    //           item: item
    //   },
    //   panelClass: panelClass
    // });
  }
}

