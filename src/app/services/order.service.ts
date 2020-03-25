import { Injectable } from '@angular/core';
import { VariationData } from '../models/VariationData';
import { ModifierData } from '../models/ModifierData';
import { OrderItem } from '../models/OrderItem';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order;
  editingItem: OrderItem;

  constructor() { }

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
}
