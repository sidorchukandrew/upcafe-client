import { Injectable } from '@angular/core';
import { LineItem } from 'src/app/models/LineItem';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { CategoryItem } from 'src/app/models/CategoryItem';
import { VariationData } from 'src/app/models/VariationData';
import { ModifierListData } from 'src/app/models/ModifierListData';
import { MenuItem } from 'src/app/models/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemStore {

  private itemSubject: BehaviorSubject<MenuItem> = new BehaviorSubject<MenuItem>(null);
  private modListSubject: BehaviorSubject<ModifierListData> = new BehaviorSubject<ModifierListData>(null);

  public currentItem$: Observable<MenuItem> = this.itemSubject.asObservable();
  public currentModList$: Observable<ModifierListData> = this.modListSubject.asObservable();

  constructor() { }

  public setSelectedItem(menuItem: MenuItem): void {

    this.itemSubject.next(menuItem);
  }

  public setSelectedModList(modList: ModifierListData) {
    this.modListSubject.next(modList);
  }
}
