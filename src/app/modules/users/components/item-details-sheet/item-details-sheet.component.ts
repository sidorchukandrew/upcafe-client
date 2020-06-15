import { Inject, Component, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModifierList } from 'src/app/models/ModifierList';
import { OrderPlacingService } from 'src/app/services/order-placing.service';
import { ModListDetailsComponent } from '../menu/mod-list-details/mod-list-details.component';
import { OrderModifier } from 'src/app/models/OrderModifier';
import { UserResponseDialog } from '../menu/eats/user-response-dialog.component';
import { MenuItem } from 'src/app/models/MenuItem';
import { MatDialog } from '@angular/material';

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

  @ViewChild("modListDetails", { static: false }) modListDetails: ModListDetailsComponent;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private orderService: OrderPlacingService,
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
