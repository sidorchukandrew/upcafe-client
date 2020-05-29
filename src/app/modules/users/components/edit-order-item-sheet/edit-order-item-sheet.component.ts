import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { CustomerOrderService } from 'src/app/services/customer-order.service';
import { MenuItem } from 'src/app/models/MenuItem';
import { OrderItem } from 'src/app/models/OrderItem';
import { ModifierList } from 'src/app/models/ModifierList';

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

  private bottomSheetRef: MatBottomSheet;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private orderService: CustomerOrderService,
  private bottomSheet: MatBottomSheet) {
    this.orderItem = data['orderItem'];
    this.menuItem = data['menuItem'];
    this.orderItemPrice = this.orderItem.price;
  }

  public close() {
    this.bottomSheet.dismiss();
  }

}
