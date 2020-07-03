import { Injectable } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrdersStore } from "./orders.store";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrdersDetailsStore {
  public orderBeingViewed: Order;
  private orderBeingViewed$: Observable<Order[]>;

  constructor(private ordersStore: OrdersStore) {}

  loadOrderDetailsView(order: Order) {
    this.orderBeingViewed = order;
  }

  setOrderBeingViewed(id: string) {
    this.orderBeingViewed$ = this.ordersStore.orders$;
    this.orderBeingViewed$.subscribe((orders) => {
      this.orderBeingViewed = orders.find((order) => id == order.id);
    });
  }
}
