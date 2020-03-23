import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';
import { CatalogByCategory } from '../models/CatalogByCategory';
import { ItemData } from '../models/ItemData';
import { VariationData } from '../models/VariationData';
import { ModifierListData } from '../models/ModifierListData';
import { CategoryItem } from '../models/CategoryItem';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  public getCatalog(category: string): any {
    return this.http.get("http://192.168.0.6:8080/catalog/" + category);
  }

  public getVariation(id: string) {
    return this.http.get("http://192.168.0.6:8080/catalog/variations/" + id);
  }

  // public parseCatalog(response: Array<any>): CatalogByCategory {
  //   var catalog = new CatalogByCategory(new Array<CategoryItem>(), "EATS");

  //   response['items'].forEach(function (item) {

  //     var itemData: ItemData = item['itemData'];
  //     var variationsData: Array<VariationData> = item['variationsData'];
  //     var modifierListsData: Array<ModifierListData> = item['modifierListsData'];

  //     var lineItem: CategoryItem = {
  //       itemData: itemData,
  //       variationsData: variationsData,
  //       modifierListsData: modifierListsData
  //     }
  //     catalog.categoryItems.push(lineItem);
  //   });

  //   console.log(catalog);
  //   return catalog;
  // }
}
