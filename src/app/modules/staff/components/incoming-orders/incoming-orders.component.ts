import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/Order";
import { Observable } from "rxjs";
import { OrdersStore } from "src/app/stores/orders.store";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";
import { OrdersDetailsStore } from "src/app/stores/order-details.store";
import { Router } from "@angular/router";

@Component({
  selector: "app-incoming-orders",
  templateUrl: "./incoming-orders.component.html",
  styleUrls: ["./incoming-orders.component.css"],
})
export class IncomingOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  message: string = "Initial";
  constructor(
    private ordersStore: OrdersStore,
    public utils: TimeUtilitiesService,
    public detailsStore: OrdersDetailsStore,
    private router: Router
  ) {}

  ngOnInit() {
    this.orders$ = this.ordersStore.selectNewOrders();
  }

  startOrder(order: Order) {
    this.ordersStore.sendUpdate(order, "ACTIVE").subscribe();
  }

  details(id: string) {
    this.detailsStore.setOrderBeingViewed(id);
  }

  swipedLeft() {
    this.router.navigate(["staff/orders/active"]);
  }

  swipedRight() {
    this.router.navigate(["staff/orders/ready"]);
  }
}
