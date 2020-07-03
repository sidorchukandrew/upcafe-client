import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderFeedService } from "src/app/services/order-feed.service";
import { Order } from "src/app/models/Order";
import { Subscription, Observable } from "rxjs";
import { OrdersStore } from "src/app/stores/orders.store";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";
import { OrdersDetailsStore } from "src/app/stores/order-details.store";
import { Router } from "@angular/router";

@Component({
  selector: "app-active-orders",
  templateUrl: "./active-orders.component.html",
  styleUrls: ["./active-orders.component.css", "../incoming-orders/incoming-orders.component.css"],
})
export class ActiveOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  public saving: boolean = false;
  constructor(
    private ordersStore: OrdersStore,
    public utils: TimeUtilitiesService,
    public detailsStore: OrdersDetailsStore,
    private router: Router
  ) {}

  ngOnInit() {
    this.orders$ = this.ordersStore.selectActiveOrders();
  }

  ready(order: Order) {
    this.saving = true;
    this.ordersStore.sendUpdate(order, "READY").subscribe(() => this.saving = false);
  }

  swipeLeft() {
    this.router.navigate(["staff/orders/ready"]);
  }

  swipeRight() {
    this.router.navigate(["staff/orders/new"]);
  }
}
