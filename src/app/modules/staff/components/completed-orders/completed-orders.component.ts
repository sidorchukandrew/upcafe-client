import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/Order";
import { Observable } from "rxjs";
import { OrdersStore } from "src/app/stores/orders.store";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";
import { OrdersDetailsStore } from "src/app/stores/order-details.store";

@Component({
  selector: "app-completed-orders",
  templateUrl: "./completed-orders.component.html",
  styleUrls: ["./completed-orders.component.css", "../incoming-orders/incoming-orders.component.css"],
})
export class CompletedOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(
    private ordersStore: OrdersStore,
    public utils: TimeUtilitiesService,
    public detailsStore: OrdersDetailsStore
  ) {}

  ngOnInit() {
    this.orders$ = this.ordersStore.selectCompleteOrders();
  }
}
