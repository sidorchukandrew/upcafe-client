import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { VariationData } from '../models/VariationData';
import { Subject } from 'rxjs';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class OrderFeedService {


  private newOrders: Array<Order>;
  private activeOrders: Array<Order>;
  private lateOrders: Array<Order>;
  private completedOrders: Array<Order>;

  private newIncomingOrder: Subject<Order>;
  private newActiveOrder: Subject<Order>;

  constructor() {
    this.newOrders = [];
    this.activeOrders = [];
    this.lateOrders = [];
    this.completedOrders = [];

    this.newIncomingOrder = new Subject();
    this.newActiveOrder = new Subject();

    var lineItems = new Array<OrderItem>();
    var lineItems2 = new Array<OrderItem>();
    var varData: VariationData = {
      name: 'Panini',
      variationPrice: 2,
      stocked: true,
      variationId: '102ne93h28',
      variationImageUrl: null
    }

    var varData2: VariationData = {
      name: 'Lemonade',
      variationPrice: 1.5,
      stocked: true,
      variationId: 'so100213',
      variationImageUrl: null
    }

    var item: OrderItem = {
      price: 2,
      quantity: 1,
      variationData: varData,
      selectedModifiers: null,
      incrementQuantity: null,
      decrementQuantity: null
    };


    var item2: OrderItem = {
      price: 1.5,
      quantity: 1,
      variationData: varData2,
      selectedModifiers: null,
      incrementQuantity: null,
      decrementQuantity: null
    };

    lineItems.push(item);
    lineItems2.push(item2);
    lineItems2.push(item);

    var customer: Customer = {
      email: '',
      firstName: 'Tayeesa',
      lastName: 'Sidorchuk',
      id: 6,
      photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhXHisd9ryNKAbdmxuRKrpR_csAkk9aZa9uYavs=s96-c'
    }

    var order: Order = {
      id: 'AmoOAOZ201KDLQ',
      pickupTime: '11:00',
      totalPrice: 5,
      selectedLineItems: lineItems,
      customer: customer,
      closedAt: null,
      createdAt: '10:45',
      pickupDate: Date(),
      state: ''
    }

    var order2: Order = {
      id: 'PLaqn819Nak1o',
      pickupTime: '10:10',
      totalPrice: 1.5,
      selectedLineItems: lineItems2,
      customer: customer,
      closedAt: null,
      createdAt: '10:00',
      pickupDate: Date(),
      state: ''
    }
    var order3: Order = {
      id: 'PLaqn819Nak1o',
      pickupTime: '13:10',
      totalPrice: 1.5,
      selectedLineItems: lineItems2,
      customer: customer,
      closedAt: null,
      createdAt: '13:00',
      pickupDate: Date(),
      state: ''
    }
    var order4: Order = {
      id: 'PLaqn819Nak1o',
      pickupTime: '9:10',
      totalPrice: 1.5,
      selectedLineItems: lineItems2,
      customer: customer,
      closedAt: null,
      createdAt: '9:00',
      pickupDate: Date(),
      state: ''
    }

    this.newOrders.push(order4);
    this.newOrders.push(order2);
    this.newOrders.push(order);
    this.newOrders.push(order3);
  }

  public getNewOrders(): Array<Order> {
    return this.newOrders;
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

}
