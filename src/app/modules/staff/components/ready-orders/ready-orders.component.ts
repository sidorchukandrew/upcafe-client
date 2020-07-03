import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "src/app/models/Order";
import { OrdersStore } from "src/app/stores/orders.store";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";
import { Router } from "@angular/router";
import { OrdersDetailsStore } from 'src/app/stores/order-details.store';

@Component({
  selector: "app-ready-orders",
  templateUrl: "./ready-orders.component.html",
  styleUrls: ["./ready-orders.component.css", "../incoming-orders/incoming-orders.component.css"],
})
export class ReadyOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  public saving: boolean = false;

  constructor(
    private ordersStore: OrdersStore,
    public utils: TimeUtilitiesService,
    public detailsStore: OrdersDetailsStore,
    private router: Router
  ) {}

  ngOnInit() {
    this.orders$ = this.ordersStore.selectReadyOrders();
  }

  complete(order: Order) {
    order.saving = true;
    this.ordersStore.sendUpdate(order, "COMPLETE").subscribe(() => order.saving = false);
  }

  details(id: string) {
    this.detailsStore.setOrderBeingViewed(id);
  }

  swipeLeft() {
    this.router.navigate(["staff/orders/new"]);
  }

  swipeRight() {
    this.router.navigate(["staff/orders/active"]);
  }
}
