import { Component, OnInit, OnDestroy, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Observable } from 'rxjs';
import { OrdersStore } from 'src/app/services/stores/orders.store';
import { TimeUtilitiesService } from 'src/app/services/time-utilities.service'

@Component({
  selector: 'app-incoming-orders',
  templateUrl: './incoming-orders.component.html',
  styleUrls: ['./incoming-orders.component.css']
})
export class IncomingOrdersComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(private ordersStore: OrdersStore, public utils: TimeUtilitiesService) {
  }

  ngOnInit() {
    this.orders$ = this.ordersStore.selectNewOrders();
  }

  startOrder(order: Order) {
    this.ordersStore.sendUpdate(order, "ACTIVE").subscribe();
  }
}
