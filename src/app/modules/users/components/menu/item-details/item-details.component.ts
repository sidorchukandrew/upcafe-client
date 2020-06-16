import { Component, OnInit, ViewChild, OnDestroy, Inject } from "@angular/core";
import { MenuItem } from 'src/app/models/MenuItem';
import { ModifierList } from 'src/app/models/ModifierList';
import { OrderModifier } from 'src/app/models/OrderModifier';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA, MatDialog } from '@angular/material';
import { ModListDetailsComponent } from '../mod-list-details/mod-list-details.component';
import { OrderPlacingService } from 'src/app/services/order-placing.service';
import { UserResponseDialog } from '../eats/user-response-dialog.component';
import { MenuService } from 'src/app/services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.css"],
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

  public item: MenuItem;
  public selectedModifierList: ModifierList;
  orderItemPrice: number;
  private subscriptions: Subscription;

  public selectedModifiers: Array<OrderModifier>;

  private bottomSheetRef: MatBottomSheet;

  @ViewChild("modListDetails", { static: false }) modListDetails: ModListDetailsComponent;

  constructor(private orderService: OrderPlacingService, private menuService: MenuService,
    private successDialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {

    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.route.params.subscribe(params => {

        this.item = this.menuService.getItemBeingViewed(params['id']);

        this.orderItemPrice = this.item.price;
        this.selectedModifierList = this.item.modifierLists[0];
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  public addToOrder() {
    var orderItem = this.orderService.newOrderItem(this.item, null, this.orderItemPrice);
    orderItem.selectedModifiers = this.modListDetails.getSelectedModifiers();
    this.orderService.addToOrder(orderItem);
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

  protected getDollars(price: number): string {
    var priceText: string = price.toString();
    var indexOfDecimal = priceText.indexOf(".");

    if (indexOfDecimal == -1) return priceText;

    return priceText.substr(0, indexOfDecimal);
  }

  protected getCents(price: number): string {
    var priceText: string = price.toString();
    var indexOfDecimal = priceText.indexOf(".");

    if (indexOfDecimal == -1) return "00";

    return priceText.substr(indexOfDecimal + 1, priceText.length).padEnd(2, "0");
  }
}
