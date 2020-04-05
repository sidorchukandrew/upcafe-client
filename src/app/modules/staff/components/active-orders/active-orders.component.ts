import { Component, OnInit } from '@angular/core';
import { OrderFeedService } from 'src/app/services/order-feed.service';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {


  orders: Array<Order>;
  constructor(private ordersFeed: OrderFeedService) { }

  ngOnInit() {
    this.orders = this.ordersFeed.getActiveOrders();
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
