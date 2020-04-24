import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { Subscription } from "rxjs";
import { Order } from "src/app/models/Order";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";

@Component({
  selector: "app-track-order",
  templateUrl: "./track-order.component.html",
  styleUrls: ["./track-order.component.css"],
})
export class TrackOrderComponent implements OnInit, OnDestroy {
  status: string;
  subscriptions: Subscription;
  order: Order;

  checkInterval$;

  constructor(
    private orderService: OrderService,
    public utils: TimeUtilitiesService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.order = this.orderService.order;

    var status$ = this.orderService.status$.subscribe(
      (status) => (this.status = status)
    );
    var state$ = this.orderService.state$.subscribe((state) => {
      if (state == "NEW") {
        clearInterval(this.checkInterval$);
        this.ngOnDestroy();
      }
    });

    this.orderService.checkStatusOfOrder().subscribe();

    this.checkInterval$ = setInterval(() => {
      console.log("Checking");
      this.orderService.checkStatusOfOrder().subscribe();
      this.order = this.orderService.order;
    }, 5000);

    this.subscriptions.add(status$);
    this.subscriptions.add(state$);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    clearInterval(this.checkInterval$);
  }
}
