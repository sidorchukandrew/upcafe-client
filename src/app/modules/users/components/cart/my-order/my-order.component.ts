import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/Order";
import { CustomerOrderService } from "src/app/services/customer-order.service";
import { Router } from "@angular/router";
import { EditItemService } from "src/app/services/edit-item.service";
import { OrderItem } from "src/app/models/OrderItem";
import { BehaviorSubject, Observable } from "rxjs";
import { CartBadgeService } from "src/app/services/cart-badge.service";
import { HoursService } from "src/app/services/hours.service";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";
import { Block } from "src/app/models/Block";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-my-order",
  templateUrl: "./my-order.component.html",
  styleUrls: ["./my-order.component.css"],
})
export class MyOrderComponent implements OnInit {
  currentOrder: Order;
  availableTimes: Array<string>;
  selectedTime: string;

  constructor(
    private orderService: CustomerOrderService,
    private router: Router,
    private editService: EditItemService,
    private badgeService: CartBadgeService,
    private hoursService: HoursService,
    public timeUtils: TimeUtilitiesService
  ) {}

  ngOnInit() {
    var today = new Date();

    var pickupTimes$ = this.hoursService.getAvailablePickupTimes();

    pickupTimes$.pipe(
      map(available => available['availableTimes']),
      tap(times => this.availableTimes = times)
    ).subscribe();

    this.currentOrder = this.orderService.order;

    if (this.currentOrder) this.selectedTime = this.currentOrder.pickupTime;
  }

  removeFromOrder(orderItem: OrderItem): void {
    // var index = this.currentOrder.selectedLineItems.indexOf(orderItem);
    // this.currentOrder.selectedLineItems.splice(index, 1);

    // var newPrice: number = 0;
    // this.currentOrder.selectedLineItems.forEach((item) => {
    //   newPrice += item.price * item.quantity;
    // });

    // this.currentOrder.totalPrice = newPrice;

    // this.badgeService.removedItemFromCart();

    // if (this.currentOrder.selectedLineItems.length == 0) {
    //   this.currentOrder = null;
    //   this.orderService.emptyCart();
    // }
  }

  navigateToEditItem(orderItem: OrderItem) {
    // this.editService.unchangedItem = orderItem;
    // this.router.navigate([
    //   "user/cart/edit",
    //   orderItem.variationData.variationId,
    // ]);
  }

  timeSelected(time: string) {
    this.selectedTime = time;
    this.currentOrder.pickupTime = time;
  }
}
