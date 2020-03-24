import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CategoryItem } from 'src/app/models/CategoryItem';
import { MenuService } from 'src/app/services/menu.service';
import { LineItem } from 'src/app/models/LineItem';
import { ModifierData } from 'src/app/models/ModifierData';
import { ModifierListData } from 'src/app/models/ModifierListData';
import { MatSnackBar } from '@angular/material';
import { CatalogService } from 'src/app/services/catalog.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ModListDetailsComponent } from '../mod-list-details/mod-list-details.component';
import { OrderService } from 'src/app/services/order.service';
import { VariationData } from 'src/app/models/VariationData';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  @ViewChild(ModListDetailsComponent, { static: false })
  private modListDetailsComponent: ModListDetailsComponent;

  item: LineItem;
  totalItemPrice: number;
  priceDollars: number;
  priceCents: any;
  currentCents: number;

  constructor(private menuService: MenuService, private snackBar: MatSnackBar, private catalogService: CatalogService,
    private route: ActivatedRoute, private orderService: OrderService, public userResponseDialog: MatDialog) {

    this.menuService.menuBarHidden = true;
    this.item = new LineItem();

    if (menuService.getCurrentLineItem().itemData != null) {
      this.item = menuService.getCurrentLineItem();
      this.menuService.menuBarHidden = true;
      this.totalItemPrice = this.item.variationData.variationPrice;
      this.parsePrice(this.totalItemPrice);
    }
    else {
      this.catalogService.getVariation(this.route.snapshot.paramMap.get('id')).subscribe(lineItem => {
        this.item.itemData = lineItem['itemData'];
        this.item.variationData = lineItem['variationData'];
        this.item.modifierListsData = lineItem['modifierListsData'];
        this.totalItemPrice = this.item.variationData.variationPrice;
        this.parsePrice(this.totalItemPrice);
      });
    }

  }

  ngOnInit() {
  }

  parsePrice(price: number): void {
    var index: number = price.toString().indexOf('.');

    if (index != -1) {
      this.priceDollars = parseInt(price.toString().substr(0, index));
      this.priceCents = parseInt(price.toString().substr(index + 1, price.toString().length));
    }
    else {
      this.priceDollars = price;
      this.priceCents = '00';
    }
  }

  async counter(start: number, end: number, durationMs: number) {

    var delayTime: number = durationMs / (end - start);

    while (start < end) {
      start = start + 1;
      this.currentCents = start;
      await this.delay(delayTime);
    }

  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public loadModifierList(modifierListData: ModifierListData): void {
    this.menuService.setCurrentModifierList(modifierListData);
  }

  public addToOrder(): void {

    var selectedModifiers;
    if (this.modListDetailsComponent)
      selectedModifiers = this.modListDetailsComponent.getSelectedModifiers();

    var variationData: VariationData = this.item.variationData;
    if (variationData.name == 'Regular')
      variationData.name = this.item.itemData.name;

    var orderItem = this.orderService.newOrderItem(variationData, selectedModifiers);
    this.orderService.addToOrder(orderItem);

    this.userResponseDialog.open(UserResponseDialog, {
      hasBackdrop: true
    });
  }
}

@Component({
  selector: 'user-response-dialog',
  templateUrl: 'user-response-dialog.html',
  styleUrls: ['user-response-dialog.css']
})
export class UserResponseDialog {

  constructor(
    public dialogRef: MatDialogRef<UserResponseDialog>, private router: Router) { }

  close(): void {
    this.dialogRef.close();
  }

  viewOrder(): void {
    this.router.navigate(['user/cart']);
    this.close();
  }
}
