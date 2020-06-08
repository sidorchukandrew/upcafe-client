import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrderPlacingService } from "src/app/services/order-placing.service";
import { Router } from "@angular/router";
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
    private orderService: OrderPlacingService,
    private router: Router,
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

  protected getDollars(price: number): string {
    var priceText: string = price.toString();
    var indexOfDecimal = priceText.indexOf(".");

    if(indexOfDecimal == -1) return priceText;

    return priceText.substr(0, indexOfDecimal);
  }

  protected getCents(price: number): string {
    var priceText: string = price.toString();
    var indexOfDecimal = priceText.indexOf(".");

    if(indexOfDecimal == -1) return "00";

    return priceText.substr(indexOfDecimal + 1, priceText.length).padEnd(2, "0");
  }
}
