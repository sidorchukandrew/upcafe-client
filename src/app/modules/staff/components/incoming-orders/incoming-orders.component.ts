import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderItem } from 'src/app/models/OrderItem';
import { VariationData } from 'src/app/models/VariationData';

@Component({
  selector: 'app-incoming-orders',
  templateUrl: './incoming-orders.component.html',
  styleUrls: ['./incoming-orders.component.css']
})
export class IncomingOrdersComponent implements OnInit {

  selectedOrdersView: string;
  showOptions: boolean;
  orders: Array<Order>;

  constructor() {
    this.showOptions = false;
  }

  ngOnInit() {
    this.selectedOrdersView = "Up Next";

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

    var order: Order = {
      id: 'AmoOAOZ201KDLQ',
      pickupTime: '11:00',
      totalPrice: 5,
      selectedLineItems: lineItems
    }

    var order2: Order = {
      id: 'PLaqn819Nak1o',
      pickupTime: '10:10',
      totalPrice: 1.5,
      selectedLineItems: lineItems2
    }
    var order3: Order = {
      id: 'PLaqn819Nak1o',
      pickupTime: '13:10',
      totalPrice: 1.5,
      selectedLineItems: lineItems2
    }
    var order4: Order = {
      id: 'PLaqn819Nak1o',
      pickupTime: '9:10',
      totalPrice: 1.5,
      selectedLineItems: lineItems2
    }

    this.orders = new Array<Order>();

    this.orders.push(order2);
    this.orders.push(order);
    this.orders.push(order3);
    this.orders.push(order4);

    this.orders.sort((a, b) => {

      var hourA: number = this.parseHour(a.pickupTime);
      var hourB: number = this.parseHour(b.pickupTime);

      var minutesA: number = this.parseMinutes(a.pickupTime);
      var minutesB: number = this.parseMinutes(b.pickupTime);

      if (hourA != hourB)
        return hourA - hourB;

      else
        return minutesA - minutesB;

    });
  }

  parseHour(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(0, indexOfColon));
  }

  parseMinutes(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(indexOfColon + 1, time.length));
  }

  convertTime(time: string): string {

    var indexOfColon = time.indexOf(":");
    var hour = parseInt(time.slice(0, indexOfColon));

    if (hour > 12)
      hour -= 12;

    return (hour + ":" + time.slice(indexOfColon + 1, time.length));
  }

  selectOrderView(view: string): void {
    this.selectedOrdersView = view;
  }


}
