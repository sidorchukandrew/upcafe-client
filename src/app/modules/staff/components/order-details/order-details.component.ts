import { Component, OnInit } from "@angular/core";
import { OrdersDetailsStore } from "src/app/stores/order-details.store";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";
import { OrdersStore } from "src/app/stores/orders.store";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"],
})
export class OrderDetailsComponent implements OnInit {
  constructor(
    public detailsStore: OrdersDetailsStore,
    private router: Router,
    private location: Location,
    public utils: TimeUtilitiesService,
    private ordersStore: OrdersStore,
  ) {}

  ngOnInit() {
    if (!!!this.detailsStore.orderBeingViewed) {
      this.router.navigate(["staff/orders/new"]);
    }
  }

  back() {
    this.location.back();
  }

  update(status: string) {
    this.ordersStore
      .sendUpdate(this.detailsStore.orderBeingViewed, status)
      .subscribe();
  }
}
