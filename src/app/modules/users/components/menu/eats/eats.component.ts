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

  public loadItem(menuItem: MenuItem): void {
    this.itemStore.setSelectedItem(menuItem);
  }

  public openBottomSheet(item: MenuItem): void {

    var panelClass: string;

    item.modifierLists.length > 0 ? panelClass = "panel-with-modifiers" : panelClass = "panel-without-modifiers";

    const bottomSheetRef = this.bottomSheet.open(ItemDetailsSheet, {
      data: {bottomSheet: this.bottomSheet,
              item: item
      },
      panelClass: panelClass
    });
  }
}

import {Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ModifierList } from 'src/app/models/ModifierList';
import { CustomerOrderService } from 'src/app/services/customer-order.service';
import { ModListDetailsComponent } from '../mod-list-details/mod-list-details.component';
import { OrderModifier } from 'src/app/models/OrderModifier';
import { UserResponseDialog } from './user-response-dialog.component';

@Component({
  selector: 'item-details-sheet',
  templateUrl: './item-details-sheet.component.html',
  styleUrls: ['./item-details-sheet.component.css']
})
export class ItemDetailsSheet {

  public item: MenuItem;
  public selectedModifierList: ModifierList;
  orderItemPrice: number;

  public selectedModifiers: Array<OrderModifier>;

  private bottomSheetRef: MatBottomSheet;

  @ViewChild("modListDetails", {static: false}) modListDetails: ModListDetailsComponent;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private orderService: CustomerOrderService,
              private successDialog: MatDialog) {
    this.item = data['item'];

    this.orderItemPrice = this.item.price;
    this.bottomSheetRef = data['bottomSheet'];
    this.selectedModifierList = this.item.modifierLists[0];
  }

  public close() {
    this.bottomSheetRef.dismiss();
  }

  public addToOrder() {
    var orderItem = this.orderService.newOrderItem(this.item, null, this.orderItemPrice);
    orderItem.selectedModifiers = this.modListDetails.getSelectedModifiers();
    this.orderService.addToOrder(orderItem);
    this.close();
    this.successDialog.open(UserResponseDialog);
  }

  public addToOrderItemPrice(modifierCost: number) {
    this.orderItemPrice = this.orderItemPrice + modifierCost;
  }

  public modifierSelected(modifiers: Array<OrderModifier>): void {
    this.selectedModifiers = modifiers;
  }

  public remove(modifierToRemove: OrderModifier): void {

    const index = this.selectedModifiers.findIndex(orderModifier => orderModifier.id == modifierToRemove.id);
    if (index > -1) {
      this.selectedModifiers.splice(index, 1);
      this.addToOrderItemPrice(-modifierToRemove.price);
    }
  }
}
