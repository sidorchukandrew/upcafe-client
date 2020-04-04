import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderItem } from 'src/app/models/OrderItem';
import { VariationData } from 'src/app/models/VariationData';
import { OrderFeedService } from 'src/app/services/order-feed.service';
import { Subscription } from 'rxjs';
import { MatSnackBarRef, MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-incoming-orders',
  templateUrl: './incoming-orders.component.html',
  styleUrls: ['./incoming-orders.component.css']
})
export class IncomingOrdersComponent implements OnInit, OnDestroy {

  subscriptions: Subscription;
  showOptions: boolean;
  orders: Array<Order>;

  constructor(private ordersFeed: OrderFeedService, private snackBar: MatSnackBar) {
    this.showOptions = false;
  }

  ngOnInit() {

    this.subscriptions = new Subscription();

    if (this.ordersFeed.getNewOrders().length == 0) {

      this.subscriptions.add(this.ordersFeed.getNewOrdersObservable().subscribe(newOrdersList => {
        this.orders = newOrdersList;
        this.orders.sort((a, b) => {
          var hourA: number = this.ordersFeed.parseHour(a.pickupTime);
          var hourB: number = this.ordersFeed.parseHour(b.pickupTime);

          var minutesA: number = this.ordersFeed.parseMinutes(a.pickupTime);
          var minutesB: number = this.ordersFeed.parseMinutes(b.pickupTime);

          if (hourA != hourB)
            return hourA - hourB;

          else
            return minutesA - minutesB;
        });

      }));
    }
    else {
      this.orders = this.ordersFeed.getNewOrders();
      this.orders.sort((a, b) => {
        var hourA: number = this.ordersFeed.parseHour(a.pickupTime);
        var hourB: number = this.ordersFeed.parseHour(b.pickupTime);

        var minutesA: number = this.ordersFeed.parseMinutes(a.pickupTime);
        var minutesB: number = this.ordersFeed.parseMinutes(b.pickupTime);

        if (hourA != hourB)
          return hourA - hourB;

        else
          return minutesA - minutesB;
      });

    }


    this.subscriptions.add(this.ordersFeed.getNewIncomingOrder().subscribe(newOrder => {
      this.orders.sort((a, b) => {
        var hourA: number = this.ordersFeed.parseHour(a.pickupTime);
        var hourB: number = this.ordersFeed.parseHour(b.pickupTime);

        var minutesA: number = this.ordersFeed.parseMinutes(a.pickupTime);
        var minutesB: number = this.ordersFeed.parseMinutes(b.pickupTime);

        if (hourA != hourB)
          return hourA - hourB;

        else
          return minutesA - minutesB;
      });

    }));

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  startOrder(order: Order) {
    this.openSnackBar(order);
    this.ordersFeed.setNewActiveOrder(order);
    this.ordersFeed.setNewOrdersList(this.ordersFeed.removeFromOrders(this.ordersFeed.getNewOrders(), order));
    console.log(this.ordersFeed.getNewOrders());

    this.orders = this.ordersFeed.removeFromOrders(this.orders, order);
  }

  convertTime(time: string): string {

    var indexOfColon = time.indexOf(":");
    var hour = parseInt(time.slice(0, indexOfColon));

    if (hour > 12)
      hour -= 12;

    return (hour + ":" + time.slice(indexOfColon + 1, time.length));
  }

  openSnackBar(order: Order) {
    this.snackBar.openFromComponent(UndoActionComponent, {
      duration: 3000,
      data: order
    });
  }

}

@Component({
  selector: 'undo-action-component',
  templateUrl: 'undo-action.component.html',
  styleUrls: ['undo-action.component.css']
})
export class UndoActionComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private ordersFeed: OrderFeedService) { }

  undo(order: Order) {
    this.ordersFeed.setNewIncomingOrder(order);
    this.ordersFeed.removeFromOrders(this.ordersFeed.getActiveOrders(), order);
  }
}