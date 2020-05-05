import { Component, OnInit, Input } from "@angular/core";
import { Order } from "src/app/models/Order";
import { CustomerOrderService } from "src/app/services/customer-order.service";

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.css"],
})
export class OrderSummaryComponent implements OnInit {
  @Input() id: string;

  order: Order;

  constructor(private orderService: CustomerOrderService) {}

  ngOnInit() {
    this.orderService
      .getOrderById(this.id)
      .subscribe((order) => (this.order = order));
  }

  public appendComma(name: string, index: number, length: number): string {
    if (index < length - 1) return name + ", ";

    return name;
  }
}
