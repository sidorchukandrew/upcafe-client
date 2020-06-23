import { Component, OnInit } from "@angular/core";
import { OrderFeedService } from "src/app/services/order-feed.service";
import { OrdersStore } from "src/app/stores/orders.store";
import { Observable } from "rxjs";
import { Order } from "src/app/models/Order";
import { NavbarLink } from 'src/app/modules/navbar/components/navbar/navbar.component';

@Component({
  selector: "app-staff",
  templateUrl: "./staff.component.html",
  styleUrls: ["./staff.component.css"],
})
export class StaffComponent implements OnInit {

  public links: Array<NavbarLink>;

  constructor(
    private ordersStore: OrdersStore
  ) {}

  ngOnInit() {

    let ordersLink = {
      icon: "restaurant_menu",
      route: "orders"
    };

    let cafeLink = {
      icon: "storefront",
      route: "cafe"
    };

    let profileLink = {
      icon: "person",
      route: "account"
    };

    this.links = [ordersLink, cafeLink, profileLink];

    this.ordersStore.loadOrdersFromAPI(new Date().toDateString());
  }
}
