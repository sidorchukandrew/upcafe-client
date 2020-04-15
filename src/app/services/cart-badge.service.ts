import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartBadgeService {

  private numberSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public newItemCount$: Observable<number> = this.numberSubject.asObservable();

  constructor() { }

  cartViewed(): void {
    this.numberSubject.next(0);
  }

  addedItemToCart(): void {
    this.numberSubject.next(this.numberSubject.value + 1);
  }
}
