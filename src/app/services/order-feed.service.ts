import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class OrderFeedService {


  private newOrders: Array<Order>;
  private activeOrders: Array<Order>;
  private lateOrders: Array<Order>;
  private completedOrders: Array<Order>;

  private newOrdersObservable: Subject<Array<Order>>;
  private activeOrdersObservable: Subject<Array<Order>>;

  private stompClient;

  constructor(private http: HttpClient) {
    this.newOrders = [];
    this.activeOrders = [];
    this.lateOrders = [];
    this.completedOrders = [];

    this.newOrdersObservable = new Subject();
    this.activeOrdersObservable = new Subject();

    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection(): void {
    const serverUrl = environment.backendUrl + '/gs-guide-websocket';
    const ws = new SockJS(serverUrl);

    this.stompClient = Stomp.over(ws);

    const that = this;

    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/new', (message) => {
        var order: Order = JSON.parse(message.body);
        that.setNewIncomingOrder(order);
      });

      that.stompClient.subscribe('/active', (message) => {
        var order: Order = JSON.parse(message.body);
        that.newOrders = that.removeFromOrders(that.newOrders, order);
        that.setNewActiveOrder(order);
      });
    });
  }

  public sendUpdate(order: Order): any {
    return this.http.post(environment.backendUrl + "/orders", order, {
      params: {
        state: 'active'
      }
    });
  }

  // Observables, for when the application first loads. These should only be called if the corresponding 
  //   lists are empty still, meaning they haven't been loaded from the API yet

  public setNewOrdersObservableList(orders: Array<Order>): void {
    orders = orders.sort(this.increasingTime);
    this.newOrders = orders;
    this.newOrdersObservable.next(orders);
  }

  public setActiveOrdersObservable(orders: Array<Order>): void {
    orders = orders.sort(this.increasingTime);
    this.activeOrders = orders;
    this.activeOrdersObservable.next(orders);
  }

  public getNewOrdersObservable(): Subject<Array<Order>> {
    return this.newOrdersObservable;
  }

  public getActiveOrdersObservable(): Subject<Array<Order>> {
    return this.activeOrdersObservable;
  }


  // Regular in memory lists, for when the staff component already loaded in the data from the API.
  //    This is so the app doesn't have to keep making API calls.

  public getNewOrders(): Array<Order> {
    return this.newOrders;
  }

  public getActiveOrders(): Array<Order> {
    return this.activeOrders;
  }

  public getLateOrders(): Array<Order> {
    return this.lateOrders;
  }

  // These may be useful later

  // public setNewOrdersList(orders: Array<Order>) {
  //   this.newOrders = orders;
  // }

  // public setActiveOrders(orders: Array<Order>): void {
  //   this.activeOrders = orders;
  // }


  // These are for when the web socket publishes an order. The order gets added to its corresponding list and the view 
  //  updates accordingly

  public setNewIncomingOrder(newOrder: Order) {
    this.newOrders.push(newOrder);
    this.newOrders = this.newOrders.sort(this.increasingTime);
  }

  public setNewActiveOrder(newOrder: Order) {
    this.activeOrders.push(newOrder);
    this.activeOrders = this.activeOrders.sort(this.increasingTime);
  }


  public removeFromOrders(orders: Array<Order>, toBeRemoved: Order): Array<Order> {
    var index = orders.findIndex(order => {
      return order.id == toBeRemoved.id;
    });

    if (index != -1) {
      orders.splice(index, 1);
    }
    return orders;
  }

  public getOrdersByState(state: string): any {
    return this.http.get(environment.backendUrl + "/orders", {
      params: {
        state: state
      }
    });
  }

  public increasingTime(a: Order, b: Order): number {

    // If they're both ASAP, they have the same index
    if (a.pickupTime == 'ASAP' && b.pickupTime == 'ASAP')
      return 0;

    // Maybe one of them is ASAP, if so return which one should be first
    if (a.pickupTime == 'ASAP') {
      return -1;
    }

    if (b.pickupTime == 'ASAP') {
      return 1;
    }

    // None of them are ASAP, compare the hours
    var hourA: number;
    var indexOfColon = a.pickupTime.indexOf(":");
    hourA = parseInt(a.pickupTime.slice(0, indexOfColon));

    var hourB: number;
    var indexOfColon = b.pickupTime.indexOf(":");
    hourB = parseInt(b.pickupTime.slice(0, indexOfColon));

    if (hourA != hourB) {
      return hourA - hourB;
    }

    // The hours were the same, so compare the minutes
    var minutesA: number;
    var indexOfColon = a.pickupTime.indexOf(":");
    minutesA = parseInt(a.pickupTime.slice(indexOfColon + 1, a.pickupTime.length));

    var minutesB: number;
    var indexOfColon = b.pickupTime.indexOf(":");
    minutesB = parseInt(b.pickupTime.slice(indexOfColon + 1, b.pickupTime.length));

    return minutesA - minutesB;
  }

  public parseHour(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(0, indexOfColon));
  }

  public parseMinutes(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(indexOfColon + 1, time.length));
  }

}
