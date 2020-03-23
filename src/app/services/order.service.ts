import { Injectable } from '@angular/core';
import { VariationData } from '../models/VariationData';
import { ModifierData } from '../models/ModifierData';
import { OrderItem } from '../models/OrderItem';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  public newOrderItem(variationData: VariationData, selectedModifiers: Array<ModifierData>): void {

    var orderItem = new OrderItem();
    orderItem.variationData = variationData;
    orderItem.selectedModifiers = selectedModifiers;

    var price: number = 0;
    selectedModifiers.forEach(m => price += m.price);
    price += variationData.variationPrice;

    orderItem.price = price;

    console.log(orderItem);
  }
}
