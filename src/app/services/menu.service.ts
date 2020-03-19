import { Injectable } from '@angular/core';
import { CategoryItem } from '../models/CategoryItem';
import { LineItem } from '../models/LineItem';
import { VariationData } from '../models/VariationData';
import { ModifierData } from '../models/ModifierData';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  currentLineItem: LineItem;
  currentModifierList: Array<ModifierData>;
  observableCurrentModifiers;

  constructor() {
    this.currentLineItem = new LineItem();
    this.currentModifierList = new Array<ModifierData>();
    this.observableCurrentModifiers = new Subject();
  }

  getCurrentLineItem(): LineItem {
    return this.currentLineItem;
  }

  setCurrentLineItem(item: CategoryItem, variationData: VariationData): void {
    this.currentLineItem.name = item.itemData.name;
    this.currentLineItem.description = item.itemData.description;
    this.currentLineItem.variationData = variationData;
    this.currentLineItem.modifierListsData = item.modifierListsData;
  }

  getCurrentModifierList(): any {
    return this.observableCurrentModifiers;
  }

  setCurrentModifierList(modifiers: Array<ModifierData>): void {
    this.observableCurrentModifiers.next(modifiers);
  }
}
