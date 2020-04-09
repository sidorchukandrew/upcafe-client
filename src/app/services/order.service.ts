import { Injectable } from '@angular/core';
import { VariationData } from '../models/VariationData';
import { ModifierData } from '../models/ModifierData';
import { OrderItem } from '../models/OrderItem';
import { Order } from '../models/Order';
import { HttpClient } from '@angular/common/http';
// import { OrderConfirmation } from '../models/OrderConfirmation';
import { Subject } from 'rxjs';
import { Customer } from '../models/Customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order;
  customer: Customer;
  editingItem: OrderItem;
  observableConfirmation: Subject<Order>;

  constructor(private http: HttpClient) {
    this.observableConfirmation = new Subject();

    this.customer = {
      email: 'sidorchukandrew@gmail.com',
      firstName: 'Andrew',
      lastName: 'Sidorchuk',
      id: 5,
      photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhIz8ImV-cH4k5bKa2DDVJD-QPW238HRL6xL9ey=s96-c'
    }

    localStorage.clear();
    localStorage.setItem("firstName", this.customer.firstName);
    localStorage.setItem("lastName", this.customer.lastName);
    localStorage.setItem("id", this.customer.id + '');
    localStorage.setItem("email", this.customer.email);
    localStorage.setItem("photoUrl", this.customer.photoUrl);


  }

  public newOrderItem(variationData: VariationData, selectedModifiers: Array<ModifierData>): OrderItem {

    if (this.order == null) {
      console.log("Creating new order.");
      this.order = new Order();
      this.order.customer = this.customer;
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
    return this.http.post(environment.backendUrl + "/orders", this.order);
  }

  public setConfirmation(confirmation: Order) {
    this.observableConfirmation.next(confirmation);
  }

  public getConfirmation(): Subject<Order> {
    return this.observableConfirmation;
  }

  public clearOrders(): void {
    console.log("Clearing order.");
    this.observableConfirmation.next(null);
    this.order = null;
  }

  public postPayment(nonce: string, orderId: string, price: number): any {
    return this.http.post(environment.backendUrl + "/orders/pay", {
      "nonce": nonce,
      "orderId": orderId,
      "price": price
    });
  }

  public getIncompleteCustomersOrders(): any {
    return this.http.get(environment.backendUrl + "/orders/customer/5");
  }
}
