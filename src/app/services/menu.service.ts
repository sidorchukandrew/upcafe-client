import { Injectable } from '@angular/core';
import { CategoryItem } from '../models/CategoryItem';
import { LineItem } from '../models/LineItem';
import { VariationData } from '../models/VariationData';
import { ModifierData } from '../models/ModifierData';
import { Observable, Subject } from 'rxjs';
import { ModifierListData } from '../models/ModifierListData';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  currentLineItem: LineItem;
  currentModifierList: Array<ModifierData>;
  observableCurrentModifiers;
  menuBarHidden: boolean;

  constructor() {
    this.currentLineItem = new LineItem();
    this.currentModifierList = new Array<ModifierData>();
    this.observableCurrentModifiers = new Subject();
    this.menuBarHidden = false;
  }

  getCurrentLineItem(): LineItem {
    return this.currentLineItem;
  }

  setCurrentLineItem(item: CategoryItem, variationData: VariationData): void {
    this.currentLineItem.itemData = item.itemData;
    this.currentLineItem.variationData = variationData;
    this.currentLineItem.modifierListsData = item.modifierListsData;
  }

  getCurrentModifierListData(): any {
    return this.observableCurrentModifiers;
  }

  setCurrentModifierList(modifierListData: ModifierListData): void {
    this.observableCurrentModifiers.next(modifierListData);
  }
}
