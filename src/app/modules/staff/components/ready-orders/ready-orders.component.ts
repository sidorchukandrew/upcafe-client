import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { OrdersStore } from 'src/app/services/stores/orders.store';
import { TimeUtilitiesService } from 'src/app/services/time-utilities.service';

@Component({
  selector: 'app-ready-orders',
  templateUrl: './ready-orders.component.html',
  styleUrls: ['./ready-orders.component.css']
})
export class ReadyOrdersComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(private ordersStore: OrdersStore, public utils: TimeUtilitiesService) { }

  ngOnInit() {
    this.orders$ = this.ordersStore.selectReadyOrders();
  }

  complete(order: Order) {
    console.log("clicked!");
    this.ordersStore.sendUpdate(order, 'COMPLETE').subscribe();
  }
}
