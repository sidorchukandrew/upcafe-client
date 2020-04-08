import { Component, OnInit } from '@angular/core';
import { OrderFeedService } from 'src/app/services/order-feed.service';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements OnInit {

  orders: Array<Order>;

  constructor(private ordersFeed: OrderFeedService) { }

  ngOnInit() {
    this.ordersFeed.getOrdersByState("completed").subscribe(ordersList => {
      this.orders = ordersList;
    });
  }

  appendComma(item: string, index: number, length: number): string {
    return '';
  }

  convertTime(time: string): string {
    return '';
  }

  extractTime(time: string): string {
    return '';
  }

}
