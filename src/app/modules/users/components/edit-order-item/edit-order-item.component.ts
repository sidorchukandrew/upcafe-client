import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem';
import { ModifierList } from 'src/app/models/ModifierList';
import { Subscription } from 'rxjs';
import { OrderModifier } from 'src/app/models/OrderModifier';
import { OrderPlacingService } from 'src/app/services/order-placing.service';
import { MenuService } from 'src/app/services/menu.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UserResponseDialog } from '../menu/eats/user-response-dialog.component';
import { EditItemService } from 'src/app/services/edit-item.service';
import { OrderItem } from 'src/app/models/OrderItem';

@Component({
  selector: 'app-edit-order-item',
  templateUrl: './edit-order-item.component.html',
  styleUrls: ['./edit-order-item.component.css', "../menu/item-details/item-details.component.css"]
})
export class EditOrderItemComponent implements OnInit, OnDestroy {

  public item: MenuItem;
  orderItemPrice: number;

  private subscriptions: Subscription;
  private previosulyCreatedOrderItem: OrderItem;

  public selectedModifiers: Array<OrderModifier>;

  constructor(private orderService: OrderPlacingService, private menuService: MenuService,
    private successDialog: MatDialog, private route: ActivatedRoute, private editService: EditItemService) { }

  ngOnInit() {

    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.route.params.subscribe(params => {

        this.item = this.menuService.getItemBeingViewed(params['id']);

        this.orderItemPrice = this.item.price;
      }));


      this.selectedModifiers = new Array<OrderModifier>();

    this.subscriptions.add(this.editService.itemBeingEdited$.subscribe(orderItem => {
      if(orderItem) {
        this.previosulyCreatedOrderItem = orderItem;
        this.selectedModifiers = orderItem.selectedModifiers;
        this.selectedModifiers.forEach(modifier => this.orderItemPrice = this.orderItemPrice + modifier.price);
      }
    }));
  }

  ngOnDestroy() {
    this.menuService.setItemBeingViewed(null);
    this.subscriptions.unsubscribe();
  }


  public updateOrderItem(): void {

    this.orderService.remove(this.previosulyCreatedOrderItem);

    let orderItem = this.orderService.newOrderItem(this.item, this.selectedModifiers, this.orderItemPrice);
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
