import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersDetailsStore {

  public orderBeingViewed: Order;

  constructor() { }

  loadOrderDetailsView(order: Order) {
    console.log("Pulling up details: ", order);
    this.orderBeingViewed = order;
  }

}
