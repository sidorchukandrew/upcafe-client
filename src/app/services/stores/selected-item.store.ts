import { Injectable } from '@angular/core';
import { LineItem } from 'src/app/models/LineItem';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { CategoryItem } from 'src/app/models/CategoryItem';
import { VariationData } from 'src/app/models/VariationData';
import { ModifierListData } from 'src/app/models/ModifierListData';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemStore {

  private itemSubject: BehaviorSubject<LineItem> = new BehaviorSubject<LineItem>(null);
  private modListSubject: BehaviorSubject<ModifierListData> = new BehaviorSubject<ModifierListData>(null);

  public currentItem$: Observable<LineItem> = this.itemSubject.asObservable();
  public currentModList$: Observable<ModifierListData> = this.modListSubject.asObservable();

  constructor() { }

  public setSelectedItem(item: CategoryItem, variationData: VariationData): void {
    var currentItem: LineItem = new LineItem();
    currentItem.itemData = item.itemData;
    currentItem.variationData = variationData;
    currentItem.modifierListsData = item.modifierListsData;

    this.itemSubject.next(currentItem);
  }

  public setSelectedModList(modList: ModifierListData) {
    this.modListSubject.next(modList);
  }
}
