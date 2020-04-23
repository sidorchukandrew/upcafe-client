import { Component, OnInit, Input } from "@angular/core";
import { LineItem } from "src/app/models/LineItem";
import { OrderItem } from "src/app/models/OrderItem";
import { ThemeService } from "src/app/services/theme.service";

@Component({
  selector: "app-item",
  templateUrl: "./order-item-details.component.html",
  styleUrls: ["./order-item-details.component.css"],
})
export class OrderItemDetailsComponent implements OnInit {
  @Input() item: OrderItem;
  constructor(public theme: ThemeService) {}

  ngOnInit() {}
}
