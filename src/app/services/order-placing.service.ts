import { Injectable } from "@angular/core";
import { OrderItem } from "../models/OrderItem";
import { Order } from "../models/Order";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";
import { CartBadgeService } from "./cart-badge.service";
import { MenuItem } from '../models/MenuItem';
import { OrderModifier } from '../models/OrderModifier';
import { User } from '../models/User';
import { AuthenticationService } from './authentication.service';
import { OrderState } from '../models/OrderStates';

@Injectable({
  providedIn: "root",
})
export class OrderPlacingService {
  public order: Order;

  private stateSubject: BehaviorSubject<OrderState> = new BehaviorSubject(OrderState.NEW);
  private statusSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  public state$: Observable<OrderState> = this.stateSubject.asObservable();
  public status$: Observable<string> = this.statusSubject.asObservable();
  private customer$: Observable<User> = this.authenticationService.authenticatedUser$;
  private customer: User;

  constructor(
    private http: HttpClient,
    private badgeService: CartBadgeService,
    private authenticationService: AuthenticationService
  ) {
    this.customer$.subscribe(user => this.customer = user);
   }

  public newOrderItem(item: MenuItem, selectedModifiers: OrderModifier[], cumulativePrice: number): OrderItem {

    this.startOrderIfNotStartedYet();

    var orderItem = new OrderItem();
    orderItem.variationId = item.id;
    orderItem.price = cumulativePrice;
    orderItem.quantity = 1;
    orderItem.name = item.name;
    orderItem.selectedModifiers = selectedModifiers;
    orderItem.tempId = Math.random() * 100;

    if(item.image)
      orderItem.imageUrl = item.image.url;

    return orderItem;
  }

  public removeOrderItem(tempId: number): void {
    let indexOfItem: number = this.order.orderItems.findIndex(item => item.tempId = tempId);
    if(indexOfItem != -1)
      this.order.orderItems.splice(indexOfItem, 1);
  }

  private startOrderIfNotStartedYet(): void {
    if (this.order == null) {
      console.log("Creating new order.");
      this.order = new Order();
      this.order.customer = this.customer;
      this.order.orderItems = new Array<OrderItem>();
      this.order.totalPrice = 0;

      this.stateSubject.next(OrderState.STARTED);
    }
  }

  public addToOrder(orderItem: OrderItem) {
    this.badgeService.addedItemToCart();
    this.order.totalPrice += orderItem.price;
    this.order.orderItems.push(orderItem);
  }

  public postOrder(): any {

    this.order.pickupDate = new Date().toDateString();

    return this.http.post(environment.backendUrl + "/orders", this.order);
  }

  public clearOrders(): void {
    console.log("clearing orders");
    this.order = null;
  }

  public postPayment(nonce: string, orderId: string, price: number): any {
    console.log("Posting the payment");
    console.log("Nonce : ", nonce);
    console.log("Order id : ", orderId);
    console.log("Price : ", price);
    return this.http
      .post(environment.backendUrl + "/orders/pay", {
        nonce: nonce,
        orderId: orderId,
        price: price,
      })
      .pipe(
        tap(() => this.stateSubject.next(OrderState.ORDER_PLACED)),
        tap(() => this.clearOrders())
      );
  }

  public remove(orderItem: OrderItem): void {
    var index = this.order.orderItems.indexOf(orderItem);

    if(index != -1) {
      this.order.orderItems.splice(index, 1);
      this.order.totalPrice = this.order.totalPrice - orderItem.price;
      this.badgeService.removedItemFromCart();
    }
    else {
      console.log("Its not in the order");
    }


    if (this.order.orderItems.length == 0) {
      this.order = null;
      this.emptyCart();
    }
  }

  public checkIfOrderAlreadyPlaced(): any {
    return this.http
      .get<Order>(
        environment.backendUrl + "/orders/customer/" + this.customer.id,
        {
          params: {
            status: "ACTIVE",
          },
        }
      )
      .pipe(tap((order) => this.parseStateOfApp(order)));
  }

  public checkStatusOfOrder(): any {
    return this.http
      .get<Order>(
        environment.backendUrl + "/orders/customer/" + this.customer.id,
        {
          params: {
            status: "ACTIVE",
          },
        }
      )
      .pipe(
        tap((order) => this.parseStatus(order)),
        tap((order) => (this.order = order))
      );
  }

  public getOrderById(id: string): any {
    return this.http.get(environment.backendUrl + "/orders/" + id);
  }

  private parseStatus(order: Order) {
    if (order) {
      this.statusSubject.next(order["status"]);
    } else {
      this.stateSubject.next(OrderState.NEW);

      this.statusSubject.next("");
    }
  }

  private parseStateOfApp(order: Order): Order {
    if (order) {
      this.stateSubject.next(OrderState.ORDER_PLACED);
    } else {
      this.order
        ? this.stateSubject.next(OrderState.STARTED)
        : this.stateSubject.next(OrderState.NEW);
    }

    return order;
  }

  public emptyCart(): void {
    this.stateSubject.next(OrderState.NEW);
    this.order = null;
  }
}
