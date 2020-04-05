import { Component, OnInit, OnDestroy, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderItem } from 'src/app/models/OrderItem';
import { VariationData } from 'src/app/models/VariationData';
import { OrderFeedService } from 'src/app/services/order-feed.service';
import { Subscription } from 'rxjs';
import { MatSnackBarRef, MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';

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
          var hourA: number;
          var hourB: number;
          var minutesA: number;
          var minutesB: number

          if (a.pickupTime == 'ASAP') {
            hourA = 0;
          }
          else {
            hourA = this.ordersFeed.parseHour(a.pickupTime);
            minutesA = this.ordersFeed.parseMinutes(a.pickupTime);
          }

          if (b.pickupTime == 'ASAP') {
            hourB = 0;
          }
          else {
            hourB = this.ordersFeed.parseHour(b.pickupTime);
            minutesB = this.ordersFeed.parseMinutes(b.pickupTime);
          }

          if (hourA == 0 || hourB == 0)
            return hourA - hourB;

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

        var hourA: number;
        var hourB: number;
        var minutesA: number;
        var minutesB: number

        if (a.pickupTime == 'ASAP') {
          hourA = 0;
        }
        else {
          hourA = this.ordersFeed.parseHour(a.pickupTime);
          minutesA = this.ordersFeed.parseMinutes(a.pickupTime);
        }

        if (b.pickupTime == 'ASAP') {
          hourB = 0;
        }
        else {
          hourB = this.ordersFeed.parseHour(b.pickupTime);
          minutesB = this.ordersFeed.parseMinutes(b.pickupTime);
        }

        if (hourA == 0 || hourB == 0)
          return hourA - hourB;

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

  extractTime(dateUTC: string): string {

    var date = new Date(dateUTC);

    if (date.getMinutes() < 10)
      return date.getHours() + ":0" + date.getMinutes();

    return date.getHours() + ":" + date.getMinutes();
  }

  convertTime(time: string): string {

    if (time == 'ASAP')
      return time;

    var indexOfColon = time.indexOf(":");
    var hour = parseInt(time.slice(0, indexOfColon));

    if (hour > 12)
      hour -= 12;

    return (hour + ":" + time.slice(indexOfColon + 1, time.length));
  }

  appendComma(name: string, index: number, length: number): string {

    if (index < length - 1)
      return name + ", ";

    return name;
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

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private ordersFeed: OrderFeedService, private snackbarRef: MatSnackBarRef<UndoActionComponent>) { }

  undo(order: Order) {
    this.ordersFeed.setNewIncomingOrder(order);
    this.ordersFeed.removeFromOrders(this.ordersFeed.getActiveOrders(), order);
    this.snackbarRef.dismiss();
  }
}