import { Component, OnInit } from "@angular/core";
import { OrderFeedService } from "src/app/services/order-feed.service";
import { OrdersStore } from "src/app/services/stores/orders.store";
import { Observable } from "rxjs";
import { Order } from "src/app/models/Order";

@Component({
  selector: "app-staff",
  templateUrl: "./staff.component.html",
  styleUrls: ["./staff.component.css"],
})
export class StaffComponent implements OnInit {

  constructor(
    private ordersStore: OrdersStore
  ) {}

  ngOnInit() {
    this.ordersStore.loadOrdersFromAPI(new Date().toDateString());
  }
}
