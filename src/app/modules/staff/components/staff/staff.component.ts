import { Component, OnInit } from "@angular/core";
import { OrderFeedService } from "src/app/services/order-feed.service";
import { OrdersStore } from "src/app/stores/orders.store";
import { Observable, Subscription } from "rxjs";
import { Order } from "src/app/models/Order";
import { NavbarLink } from 'src/app/modules/navbar/components/navbar/navbar.component';
import { PlatformService } from 'src/app/services/platform.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-staff",
  templateUrl: "./staff.component.html",
  styleUrls: ["./staff.component.css"],
})
export class StaffComponent implements OnInit {

  public links: Array<NavbarLink>;
  private subscriptions: Subscription;

  constructor(
    private ordersStore: OrdersStore,
    private platformService: PlatformService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.platformService.isDesktop$.subscribe(isDesktop => {
      if(isDesktop)
        this.router.navigate(['staff/switch']);
    }));

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
