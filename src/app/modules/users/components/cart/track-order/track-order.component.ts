import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { Subscription } from "rxjs";
import { Order } from "src/app/models/Order";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";
import { LoadingService } from "src/app/services/loading.service";
import { tap } from "rxjs/operators";

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
    public utils: TimeUtilitiesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.order = this.orderService.order;

    var loadOrderPlaced$ = this.loadingService
      .showLoadingUntilComplete(this.orderService.checkStatusOfOrder())
      .pipe(tap(() => (this.order = this.orderService.order)));

    this.subscriptions.add(loadOrderPlaced$.subscribe());

    var status$ = this.orderService.status$.subscribe(
      (status) => (this.status = status)
    );
    var state$ = this.orderService.state$.subscribe((state) => {
      if (state == "NEW") {
        clearInterval(this.checkInterval$);
        this.ngOnDestroy();
      }
    });

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
