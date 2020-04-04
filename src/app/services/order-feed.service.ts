import { Injectable } from '@angular/core';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderFeedService {


  private newOrders: Array<Order>;
  private activeOrders: Array<Order>;
  private lateOrders: Array<Order>;
  private completedOrders: Array<Order>;

  constructor() {
    this.newOrders = [];
    this.activeOrders = [];
    this.lateOrders = [];
    this.completedOrders = [];
  }

  getNewOrders(): Array<Order> {
    return this.newOrders;
  }

  getActiveOrders(): Array<Order> {
    return this.activeOrders;
  }

  getLateOrders(): Array<Order> {
    return this.lateOrders;
  }

  getCompletedOrders(): Array<Order> {
    return this.completedOrders;
  }

}
