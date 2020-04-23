import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  constructor(private ordersService: OrderService) {}

  ngOnInit() {
    this.ordersService.checkIfOrderAlreadyPlaced().subscribe();
  }
}
