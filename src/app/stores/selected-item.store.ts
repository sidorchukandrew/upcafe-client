import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from 'src/app/models/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemStore {

  private itemSubject: BehaviorSubject<MenuItem> = new BehaviorSubject<MenuItem>(null);

  public currentItem$: Observable<MenuItem> = this.itemSubject.asObservable();

  constructor() { }

  public setSelectedItem(menuItem: MenuItem): void {
    this.itemSubject.next(menuItem);
  }
}
