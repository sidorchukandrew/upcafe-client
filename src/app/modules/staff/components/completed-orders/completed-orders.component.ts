import { Component, OnInit } from '@angular/core';
import { OrderFeedService } from 'src/app/services/order-feed.service';
import { Order } from 'src/app/models/Order';
import { Observable } from 'rxjs';
import { OrdersStore } from 'src/app/services/stores/orders.store';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(private ordersStore: OrdersStore) { }

  ngOnInit() {
    this.orders$ = this.ordersStore.selectCompleteOrders();
  }
}
