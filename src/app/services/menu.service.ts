import { Injectable } from '@angular/core';
import { CategoryItem } from '../models/CategoryItem';
import { LineItem } from '../models/LineItem';
import { VariationData } from '../models/VariationData';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  currentLineItem: LineItem;
  constructor() {
    this.currentLineItem = new LineItem();
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
}
