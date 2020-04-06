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
  orders: Array<Order>;
  // audio;

  constructor(private ordersFeed: OrderFeedService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {

    this.subscriptions = new Subscription();

    // If the orders haven't been loaded in yet, subscribe so when they are loaded in from 
    //     the API, the view will update.
    if (this.ordersFeed.getNewOrders().length == 0) {

      this.subscriptions.add(this.ordersFeed.getNewOrdersObservable().subscribe(newOrdersList => {
        this.orders = this.ordersFeed.getNewOrders();
      }));
    }

    // Otherwise, this component is getting loaded after the staff component already retrieved the orders from the API
    else {
      this.orders = this.ordersFeed.getNewOrders();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  startOrder(order: Order) {
    this.ordersFeed.sendUpdate(order).subscribe();
    // this.openSnackBar(order);

    console.log(this.orders);
    console.log("vs");
    console.log(this.ordersFeed.getNewOrders());
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