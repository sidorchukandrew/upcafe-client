import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderFeedService } from 'src/app/services/order-feed.service';
import { Order } from 'src/app/models/Order';
import { Subscription, Observable } from 'rxjs';
import { OrdersStore } from 'src/app/services/stores/orders.store';
import { TimeUtilitiesService } from 'src/app/services/time-utilities.service';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(private ordersStore: OrdersStore, public utils: TimeUtilitiesService) { }

  ngOnInit() {
    this.orders$ = this.ordersStore.selectActiveOrders();
  }

  ready(order: Order) {
    console.log("clicked!");
    this.ordersStore.sendUpdate(order, 'READY').subscribe();
  }
}
