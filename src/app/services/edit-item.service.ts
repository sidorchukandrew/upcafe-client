import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderItem } from '../models/OrderItem';

@Injectable({
  providedIn: "root"
})
export class EditItemService {

  private itemBeingEdited: BehaviorSubject<OrderItem> = new BehaviorSubject(null);

  public itemBeingEdited$: Observable<OrderItem> = this.itemBeingEdited.asObservable();

  constructor() { }

  public setItemBeingEdited(item: OrderItem): void {
    this.itemBeingEdited.next(item);
  }
}
