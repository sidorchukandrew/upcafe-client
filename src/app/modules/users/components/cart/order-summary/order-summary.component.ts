import { Component, OnInit, Input } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrderPlacingService } from "src/app/services/order-placing.service";

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.css"],
})
export class OrderSummaryComponent implements OnInit {
  @Input() order: Order;

  constructor(private orderService: OrderPlacingService) {}

  ngOnInit() {

  }

  public appendComma(name: string, index: number, length: number): string {
    if (index < length - 1) return name + ", ";

    return name;
  }
}
