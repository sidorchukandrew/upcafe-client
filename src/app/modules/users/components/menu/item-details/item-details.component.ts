import { Component, OnInit, OnDestroy } from "@angular/core";
import { MenuItem } from 'src/app/models/MenuItem';
import { ModifierList } from 'src/app/models/ModifierList';
import { OrderModifier } from 'src/app/models/OrderModifier';
import { MatDialog } from '@angular/material';
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

    this.selectedModifiers = new Array<OrderModifier>();
  }

  ngOnDestroy() {
    this.menuService.setItemBeingViewed(null);
    this.subscriptions.unsubscribe();
  }


  public addToOrder(): void {
    var orderItem = this.orderService.newOrderItem(this.item, this.selectedModifiers, this.orderItemPrice);
    this.orderService.addToOrder(orderItem);
    this.successDialog.open(UserResponseDialog);
  }

  public addToOrderItemPrice(modifierCost: number): void {
    this.orderItemPrice = this.orderItemPrice + modifierCost;
  }

  public remove(modifierToRemove: OrderModifier): void {

    const index = this.selectedModifiers.findIndex(orderModifier => orderModifier.id == modifierToRemove.id);
    if (index > -1) {
      this.selectedModifiers.splice(index, 1);
      this.addToOrderItemPrice(-modifierToRemove.price);
    }
  }

  public getDollars(price: number): string {
    var priceText: string = price.toString();
    var indexOfDecimal = priceText.indexOf(".");

    if (indexOfDecimal == -1) return priceText;

    return priceText.substr(0, indexOfDecimal);
  }

  public getCents(price: number): string {
    var priceText: string = price.toString();
    var indexOfDecimal = priceText.indexOf(".");

    if (indexOfDecimal == -1) return "00";

    return priceText.substr(indexOfDecimal + 1, priceText.length).padEnd(2, "0");
  }
}
