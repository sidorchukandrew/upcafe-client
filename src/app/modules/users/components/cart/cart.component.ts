import { Component, OnInit } from "@angular/core";
import { OrderPlacingService } from "src/app/services/order-placing.service";
import { CartBadgeService } from "src/app/services/cart-badge.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  state: string;

  constructor(
    private orderService: OrderPlacingService,
    private badgeService: CartBadgeService
  ) {}

  ngOnInit() {
    this.orderService.state$.subscribe((state) => (this.state = state));

    this.orderService.checkIfOrderAlreadyPlaced().subscribe();
  }
}
