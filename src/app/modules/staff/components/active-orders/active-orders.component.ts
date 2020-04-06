import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderFeedService } from 'src/app/services/order-feed.service';
import { Order } from 'src/app/models/Order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit, OnDestroy {

  orders: Array<Order>;
  subscriptions: Subscription;

  constructor(private ordersFeed: OrderFeedService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();

    // If the orders haven't been loaded in yet, subscribe so when they are loaded in from 
    //     the API, the view will update.
    if (this.ordersFeed.getActiveOrders().length == 0) {

      console.log("Waiting for staff to load in.");
      this.subscriptions.add(this.ordersFeed.getActiveOrdersObservable().subscribe(activeOrdersList => {
        this.orders = this.ordersFeed.getActiveOrders();
      }));
    }

    // Otherwise, this component is getting loaded after the staff component already retrieved the orders from the API
    else {
      console.log("Staff already loaded it in.");
      this.orders = this.ordersFeed.getActiveOrders();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

  extractTime(dateUTC: string): string {

    var date = new Date(dateUTC);

    if (date.getMinutes() < 10)
      return date.getHours() + ":0" + date.getMinutes();

    return date.getHours() + ":" + date.getMinutes();
  }

  appendComma(name: string, index: number, length: number): string {

    if (index < length - 1)
      return name + ", ";

    return name;
  }

}
