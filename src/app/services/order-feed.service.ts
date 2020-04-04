import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { VariationData } from '../models/VariationData';
import { Subject } from 'rxjs';
import { Customer } from '../models/Customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderFeedService {


  private newOrders: Array<Order>;
  private activeOrders: Array<Order>;
  private lateOrders: Array<Order>;
  private completedOrders: Array<Order>;

  private newOrdersObservable: Subject<Array<Order>>;

  private newIncomingOrder: Subject<Order>;
  private newActiveOrder: Subject<Order>;

  constructor(private http: HttpClient) {
    this.newOrders = [];
    this.activeOrders = [];
    this.lateOrders = [];
    this.completedOrders = [];

    this.newIncomingOrder = new Subject();
    this.newActiveOrder = new Subject();

    this.newOrdersObservable = new Subject();
  }

  public getNewOrders(): Array<Order> {
    return this.newOrders;
  }

  public getNewOrdersObservable(): Subject<Array<Order>> {
    return this.newOrdersObservable;
  }

  public setNewOrdersObservableList(orders: Array<Order>) {
    this.newOrders = orders;
    this.newOrdersObservable.next(orders);
  }

  public setNewOrdersList(orders: Array<Order>) {
    this.newOrders = orders;
  }

  public getActiveOrders(): Array<Order> {
    return this.activeOrders;
  }

  public getLateOrders(): Array<Order> {
    return this.lateOrders;
  }

  public getCompletedOrders(): Array<Order> {
    return this.completedOrders;
  }

  public getNewIncomingOrder(): any {
    return this.newIncomingOrder;
  }

  public setNewIncomingOrder(newOrder: Order) {
    this.newOrders.push(newOrder);
    this.newIncomingOrder.next(newOrder);
  }

  public setNewActiveOrder(newOrder: Order) {
    this.activeOrders.push(newOrder);
    this.newActiveOrder.next(newOrder);
  }

  public parseHour(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(0, indexOfColon));
  }

  public parseMinutes(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(indexOfColon + 1, time.length));
  }

  public removeFromOrders(orders: Array<Order>, toBeRemoved: Order): Array<Order> {
    var index = orders.indexOf(toBeRemoved);
    if (index != -1) {
      orders.splice(index, 1);
    }
    return orders;
  }

  public getOrdersByState(state: string): any {
    return this.http.get("http://192.168.0.7:8080/orders", {
      params: {
        state: state
      }
    });
  }
}
