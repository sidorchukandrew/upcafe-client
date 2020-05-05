import { Component, OnInit } from "@angular/core";
import { CustomerOrderService } from "src/app/services/customer-order.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  constructor(private ordersService: CustomerOrderService) {}

  ngOnInit() {
    this.ordersService.checkIfOrderAlreadyPlaced().subscribe();
  }
}
