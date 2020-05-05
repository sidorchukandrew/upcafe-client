import { Injectable } from "@angular/core";
import { VariationData } from "../models/VariationData";
import { ModifierData } from "../models/ModifierData";
import { OrderItem } from "../models/OrderItem";
import { Order } from "../models/Order";
import { HttpClient } from "@angular/common/http";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { Customer } from "../models/Customer";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";
import { CartBadgeService } from "./cart-badge.service";
import { MenuItem } from '../models/MenuItem';
import { OrderModifier } from '../models/OrderModifier';

@Injectable({
  providedIn: "root",
})
export class CustomerOrderService {
  public order: Order;
  private customer: Customer;

  private stateSubject: BehaviorSubject<string> = new BehaviorSubject<string>("NEW");
  private statusSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  public state$: Observable<string> = this.stateSubject.asObservable();
  public status$: Observable<string> = this.statusSubject.asObservable();

  constructor(
    private http: HttpClient,
    private badgeService: CartBadgeService
  ) {
    this.customer = {
      email: "sidorchukandrew@gmail.com",
      firstName: "Andrew",
      lastName: "Sidorchuk",
      id: 5,
      photoUrl:
        "https://lh3.googleusercontent.com/a-/AOh14GhIz8ImV-cH4k5bKa2DDVJD-QPW238HRL6xL9ey=s96-c",
      dateAccountCreated: "",
    };
  }

  public newOrderItem(item: MenuItem, selectedModifiers: OrderModifier[], cumulativePrice: number): OrderItem {

    this.startOrderIfNotStartedYet();

    var orderItem = new OrderItem();
    orderItem.variationId = item.id;
    orderItem.price = cumulativePrice;
    orderItem.quantity = 1;
    orderItem.name = item.name;
    orderItem.selectedModifiers = selectedModifiers;

    return orderItem;
  }

  private startOrderIfNotStartedYet(): void {
    if (this.order == null) {
      console.log("Creating new order.");
      this.order = new Order();
      this.order.customer = this.customer;
      this.order.orderItems = new Array<OrderItem>();
      this.order.totalPrice = 0;

      this.stateSubject.next("STARTED");
    }
  }

  public addToOrder(orderItem: OrderItem) {
    this.badgeService.addedItemToCart();
    this.order.totalPrice += orderItem.price;
    this.order.orderItems.push(orderItem);
  }

  public postOrder(): any {
    if (this.order.pickupTime == null) this.order.pickupTime = "12:00";

    this.order.pickupDate = new Date().toDateString();

    return this.http.post(environment.backendUrl + "/orders", this.order);
  }

  public clearOrders(): void {
    console.log("clearing orders");
    this.order = null;
  }

  public postPayment(nonce: string, orderId: string, price: number): any {
    return this.http
      .post(environment.backendUrl + "/orders/pay", {
        nonce: nonce,
        orderId: orderId,
        price: price,
      })
      .pipe(
        tap(() => this.stateSubject.next("PLACED")),
        tap(() => this.clearOrders())
      );
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
      this.stateSubject.next("NEW");

      this.statusSubject.next("");
    }
  }

  private parseStateOfApp(order: Order): Order {
    if (order) {
      this.stateSubject.next("PLACED");
    } else {
      this.order
        ? this.stateSubject.next("STARTED")
        : this.stateSubject.next("NEW");
    }

    return order;
  }

  public emptyCart(): void {
    this.stateSubject.next("NEW");
    this.order = null;
  }
}
