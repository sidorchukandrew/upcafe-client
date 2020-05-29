import { Component, Inject, ViewChild } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { MenuItem } from 'src/app/models/MenuItem';
import { OrderItem } from 'src/app/models/OrderItem';
import { ModifierList } from 'src/app/models/ModifierList';
import { ModListDetailsComponent } from '../menu/mod-list-details/mod-list-details.component';
import { OrderModifier } from 'src/app/models/OrderModifier';

@Component({
  selector: 'app-edit-order-item-sheet',
  templateUrl: './edit-order-item-sheet.component.html',
  styleUrls: ['./edit-order-item-sheet.component.css']
})
export class EditOrderItemSheet {

  public orderItem: OrderItem;
  public menuItem: MenuItem;
  public selectedModifierList: ModifierList;

  public orderItemPrice: number;
  public selectedModifiers: Array<OrderModifier>;

  @ViewChild("modListDetails", {static: false}) modListDetails: ModListDetailsComponent;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheet: MatBottomSheet) {
    this.orderItem = data['orderItem'];
    this.menuItem = data['menuItem'];
    this.orderItemPrice = this.orderItem.price;
    this.selectedModifierList = this.menuItem.modifierLists[0];
    this.selectedModifiers = this.orderItem.selectedModifiers;
  }

  public close(): void {
    this.bottomSheet.dismiss();
  }

  public addToOrderItemPrice(modifierCost: number): void {
    this.orderItemPrice = this.orderItemPrice + modifierCost;
  }

  public updateOrder(): void {
    this.orderItem.selectedModifiers = this.modListDetails.getSelectedModifiers();
    console.log("updated")
    this.close();
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
