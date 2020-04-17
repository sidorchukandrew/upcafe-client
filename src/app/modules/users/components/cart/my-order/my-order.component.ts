import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";
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
    private orderService: OrderService,
    private router: Router,
    private editService: EditItemService,
    private badgeService: CartBadgeService,
    private hoursService: HoursService,
    private timeUtils: TimeUtilitiesService
  ) {}

  ngOnInit() {
    var today = new Date();

    var hours$ = this.hoursService.getBlocksForDay(new Date().toDateString());

    hours$.subscribe((blocks) => {
      blocks = blocks.sort(this.timeUtils.increasingTimeBlocks);
      this.availableTimes = this.breakHoursUp(blocks);
    });

    this.currentOrder = this.orderService.order;

    if (this.currentOrder) this.selectedTime = this.currentOrder.pickupTime;
  }

  removeFromOrder(orderItem: OrderItem): void {
    var index = this.currentOrder.selectedLineItems.indexOf(orderItem);
    this.currentOrder.selectedLineItems.splice(index, 1);

    var newPrice: number = 0;
    this.currentOrder.selectedLineItems.forEach((item) => {
      newPrice += item.price * item.quantity;
    });

    this.currentOrder.totalPrice = newPrice;

    this.badgeService.removedItemFromCart();

    if (this.currentOrder.selectedLineItems.length == 0) {
      this.currentOrder = null;
      this.orderService.emptyCart();
    }
  }

  navigateToEditItem(orderItem: OrderItem) {
    this.editService.unchangedItem = orderItem;
    this.router.navigate([
      "user/cart/edit",
      orderItem.variationData.variationId,
    ]);
  }

  timeSelected(time: string) {
    this.selectedTime = time;
    this.currentOrder.pickupTime = time;
  }

  private breakHoursUp(blocks: Block[]): string[] {
    var incrementFactor: number = 10;

    console.log(blocks);
    var pickupTimes: string[] = [];

    blocks.forEach((block) => {
      var openHour: number = this.timeUtils.parseHour(block.open);
      var openMinutes: number = this.timeUtils.parseMinutes(block.open);

      var closeHour: number = this.timeUtils.parseHour(block.close);
      var closeMinutes: number = this.timeUtils.parseMinutes(block.close);

      while (openHour < closeHour) {
        openMinutes = incrementFactor + openMinutes;

        if (openMinutes >= 60) {
          openMinutes = openMinutes % 60;
          openHour = openHour + 1;
        }

        if (openMinutes == 0)
          pickupTimes.push(openHour + ":" + openMinutes + "0");
        else pickupTimes.push(openHour + ":" + openMinutes);
        console.log(pickupTimes);
      }
    });

    return pickupTimes;
  }
}
