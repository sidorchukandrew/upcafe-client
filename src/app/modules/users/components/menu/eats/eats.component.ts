import { Component, OnInit, OnDestroy } from "@angular/core";
import { CatalogService } from "src/app/services/catalog.service";
import { CatalogByCategory } from "src/app/models/CatalogByCategory";
import { Catalog } from "src/app/models/Catalog";
import { SelectedItemStore } from "src/app/stores/selected-item.store";
import { LoadingService } from "src/app/services/loading.service";
import { tap, concat, map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { MenuItem } from 'src/app/models/MenuItem';
import { MatBottomSheet } from '@angular/material';
import { UserResponseDialog } from '../item-details/item-details.component';

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

  openBottomSheet(item: MenuItem): void {
    const bottomSheetRef = this.bottomSheet.open(ItemDetailsSheet, {
      data: {bottomSheet: this.bottomSheet,
              item: item
      },
      panelClass: "panel"
    });
  }
}

import {Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ModifierList } from 'src/app/models/ModifierList';
import { CustomerOrderService } from 'src/app/services/customer-order.service';

@Component({
  selector: 'item-details-sheet',
  templateUrl: './item-details-sheet.component.html',
  styleUrls: ['./item-details-sheet.component.css']
})
export class ItemDetailsSheet {

  public item: MenuItem;

  public selectedModifierList: ModifierList;

  private bottomSheetRef: MatBottomSheet;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private orderService: CustomerOrderService) {
    this.item = data['item'];

    console.log(this.item);
    this.bottomSheetRef = data['bottomSheet'];
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  addToOrder() {
    var orderItem = this.orderService.newOrderItem(this.item, null, this.item.price);
    this.orderService.addToOrder(orderItem);
  }
}
