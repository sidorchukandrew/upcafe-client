import { Component, OnInit } from "@angular/core";
import { OrderPlacingService } from "src/app/services/order-placing.service";
import { CartBadgeService } from "src/app/services/cart-badge.service";
import { OrderState } from "src/app/models/OrderStates";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  state: string;
  NEW: string = OrderState.NEW;
  PLACED: string = OrderState.ORDER_PLACED;
  STARTED: string = OrderState.STARTED;
  constructor(
    private orderService: OrderPlacingService,
    private badgeService: CartBadgeService
  ) {}

  ngOnInit() {
    this.orderService.state$.subscribe((state) => {
      this.state = state;
    });

    this.orderService.checkIfOrderAlreadyPlaced().subscribe();
  }
}
