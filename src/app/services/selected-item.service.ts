import { Injectable } from '@angular/core';
import { LineItem } from '../models/LineItem';
import { CategoryItem } from '../models/CategoryItem';
import { VariationData } from '../models/VariationData';
import { ModifierData } from '../models/ModifierData';
import { Subject } from 'rxjs';
import { ModifierListData } from '../models/ModifierListData';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemService {

  currentItem: LineItem;
  observableModifiers;
  selectedModifierList: Array<ModifierData>;

  constructor() {
    this.currentItem = new LineItem();
    this.observableModifiers = new Subject();
    this.selectedModifierList = new Array<ModifierData>();
  }

  getSelectedItem() {
    return this.currentItem;
  }

  setSelectedItem(item: CategoryItem, variationData: VariationData): void {
    this.currentItem.itemData = item.itemData;
    this.currentItem.variationData = variationData;
    this.currentItem.modifierListsData = item.modifierListsData;
  }

  setSelectedModifierList(modifierListData: ModifierListData): void {
    this.observableModifiers.next(modifierListData);
  }

  getSelectedModifierListData(): any {
    return this.observableModifiers;
  }
}
