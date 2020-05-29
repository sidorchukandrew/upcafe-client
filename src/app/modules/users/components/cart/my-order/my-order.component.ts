import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/Order";
import { CustomerOrderService } from "src/app/services/customer-order.service";
import { Router } from "@angular/router";
import { EditItemService } from "src/app/services/edit-item.service";
import { OrderItem } from "src/app/models/OrderItem";
import { HoursService } from "src/app/services/hours.service";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";
import { tap } from "rxjs/operators";
import { PickupTime } from 'src/app/models/PickupTime';
import { MatBottomSheet } from '@angular/material';
import { EditOrderItemSheet } from '../../edit-order-item-sheet/edit-order-item-sheet.component';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: "app-my-order",
  templateUrl: "./my-order.component.html",
  styleUrls: ["./my-order.component.css"],
})
export class MyOrderComponent implements OnInit {
  currentOrder: Order;
  availableTimes: Array<PickupTime>;
  selectedTime: string;

  constructor(
    private orderService: CustomerOrderService,
    private router: Router,
    private editService: EditItemService,
    private hoursService: HoursService,
    public timeUtils: TimeUtilitiesService,
    private bottomSheet: MatBottomSheet,
    private catalogService: CatalogService
  ) {}

  ngOnInit() {

    var pickupTimes$ = this.hoursService.getAvailablePickupTimes();

    pickupTimes$.pipe(
      tap(times => this.availableTimes = times)
    ).subscribe();

    this.currentOrder = this.orderService.order;

    if (this.currentOrder) this.selectedTime = this.currentOrder.pickupTime;
  }

  public removeFromOrder(orderItem: OrderItem): void {
    this.orderService.remove(orderItem);
  }

  timeSelected(time: string) {
    this.selectedTime = time;
    this.currentOrder.pickupTime = time;
  }

  public editItem(orderItem: OrderItem) {

    this.catalogService.getVariation(orderItem.variationId).subscribe(menuItem => {

      var panelClass: string;

      menuItem.modifierLists.length > 0 ? panelClass = "panel-with-modifiers" : panelClass = "panel-without-modifiers";

      this.bottomSheet.open(EditOrderItemSheet, {
        data: {
          orderItem: orderItem,
          menuItem: menuItem
        },
        panelClass: panelClass
      });
    });
  }
}
