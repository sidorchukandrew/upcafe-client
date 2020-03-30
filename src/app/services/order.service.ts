import { Injectable } from '@angular/core';
import { VariationData } from '../models/VariationData';
import { ModifierData } from '../models/ModifierData';
import { OrderItem } from '../models/OrderItem';
import { Order } from '../models/Order';
import { HttpClient } from '@angular/common/http';
import { OrderConfirmation } from '../models/OrderConfirmation';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order;
  editingItem: OrderItem;
  observableConfirmation: Subject<OrderConfirmation>;

  constructor(private http: HttpClient) {
    this.observableConfirmation = new Subject();
  }

  public newOrderItem(variationData: VariationData, selectedModifiers: Array<ModifierData>): OrderItem {

    if (this.order == null) {
      console.log("Creating new order.");
      this.order = new Order();
      this.order.selectedLineItems = new Array<OrderItem>();
      this.order.totalPrice = 0;
    }

    var orderItem = new OrderItem();
    orderItem.variationData = variationData;
    orderItem.selectedModifiers = selectedModifiers;

    var price: number = 0;

    if (selectedModifiers)
      selectedModifiers.forEach(m => price += m.price);

    price += variationData.variationPrice;

    orderItem.price = price;

    return orderItem;
  }

  public addToOrder(orderItem: OrderItem) {
    this.order.totalPrice += orderItem.price;
    this.order.selectedLineItems.push(orderItem);
  }

  public getCurrentOrder(): Order {
    return this.order;
  }

  public setItemBeingEdited(orderItem: OrderItem) {
    this.editingItem = orderItem;
  }

  public getItemBeingEdited(): OrderItem {
    return this.editingItem;
  }

  public postOrder(): any {
    if (this.order.pickupTime == null)
      this.order.pickupTime = 'ASAP';
    return this.http.post("http://192.168.0.6:8080/orders", this.order);
  }

  public setConfirmation(confirmation: OrderConfirmation) {
    this.observableConfirmation.next(confirmation);
  }

  public getConfirmation(): Subject<OrderConfirmation> {
    return this.observableConfirmation;
  }

  public clearOrders(): void {
    console.log("Clearing order.");
    this.observableConfirmation.next(null);
    this.order = null;
  }

  public postPayment(nonce: string, orderId: string, price: number): any {
    return this.http.post("http://192.168.0.6:8080/orders/pay", {
      "nonce": nonce,
      "orderId": orderId,
      "price": price
    });
  }

  public getIncompleteCustomersOrders(): any {
    return this.http.get("http://192.168.0.6:8080/orders/customer/5");
  }
}
