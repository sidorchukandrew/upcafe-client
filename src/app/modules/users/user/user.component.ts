import { Component, OnInit } from "@angular/core";
import { OrderPlacingService } from "src/app/services/order-placing.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  constructor(private ordersService: OrderPlacingService, private http: HttpClient) {}

  ngOnInit() {
    this.ordersService.checkIfOrderAlreadyPlaced().subscribe();
  }
}
