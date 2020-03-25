import { Injectable } from '@angular/core';
import { OrderItem } from '../models/OrderItem';

@Injectable({
  providedIn: 'root'
})
export class EditItemService {

  unchangedItem: OrderItem;
  editedOrderItem: OrderItem;

  constructor() { }
}
