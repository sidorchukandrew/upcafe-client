import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { CatalogInventoryChange } from '../models/CatalogInventoryChange';
import { MenuItem } from '../models/MenuItem';
import { CatalogWhole } from '../models/CatalogWhole';
import { CatalogObject } from '../models/CatalogObject';
import { ModifierList } from '../models/ModifierList';
import { Modifier } from '../models/Modifier';
import { CatalogObjectTypes } from '../models/CatalogObjectTypes';

@Injectable({
  providedIn: "root",
})
export class CatalogService {

  private catalog: BehaviorSubject<CatalogWhole> = new BehaviorSubject(null);
  public catalog$: Observable<CatalogWhole> = this.catalog.asObservable();

  constructor(private http: HttpClient) { }

  public getVariation(id: string): Observable<MenuItem> {
    return this.http.get<MenuItem>(environment.backendUrl + "/menu/items/" + id);
  }

  public loadCatalogIfNotLoadedYet(): void {
    if (this.catalog.getValue() == null) {
      this.getCatalog().subscribe(catalogResponse => this.catalog.next(catalogResponse['catalog']));
    }
  }

  public getCatalog(): Observable<any> {
    return this.http.get(environment.backendUrl + "/api/v1/catalog").pipe();
  }

  public updateInventory(inventoryChange: CatalogInventoryChange): Observable<any> {

    return this.http.put(environment.backendUrl + "/api/v1/catalog/inventory", {
      "variations": Array.from(inventoryChange.items),
      "modifiers": Array.from(inventoryChange.modifiers)
    });
  }

  public createImage(file: FormData, objectId: string): Observable<any> {
    return this.http.post(environment.backendUrl + "/catalog/images", file, {
      params: { objectId: objectId }
    });
  }

  public getObjectByIdAndType(id: string, type: string): CatalogObject {

    if (type == CatalogObjectTypes.MENU_ITEM) {

      this.loadCatalogIfNotLoadedYet();

      let menuItem: MenuItem = this.catalog.getValue().itemsList.find(item => item.id == id);

      if (menuItem) {
        let objectToReturn: MenuItem = {
          description: menuItem.description,
          id: menuItem.id,
          image: menuItem.image,
          inStock: menuItem.inStock,
          name: menuItem.name,
          price: menuItem.price,
          modifierLists: menuItem.modifierLists
        }

        return objectToReturn;
      }
    } else if (type == CatalogObjectTypes.MODIFIER_LIST) {

      let modifierList: ModifierList = this.catalog.getValue()
        .modifierLists.find(modifierList => modifierList.id == id);

      if (modifierList) {
        let objectToReturn: ModifierList = {
          id: modifierList.id,
          image: modifierList.image,
          modifiers: modifierList.modifiers,
          name: modifierList.name,
          selectionType: modifierList.selectionType
        }
        return objectToReturn;
      }
    } else if (type == CatalogObjectTypes.MODIFIER) {

      let objectToReturn: Modifier;

      this.catalog.getValue().modifierLists.forEach(list => {

        let modifier: Modifier = list.modifiers.find(modifier => id == modifier.id);

        if (modifier) {
          objectToReturn = {
            id: modifier.id,
            image: modifier.image,
            inStock: modifier.inStock,
            modifierListId: modifier.modifierListId,
            name: modifier.name,
            onByDefault: modifier.onByDefault,
            price: modifier.price
          }
        }
      });

      return objectToReturn;
    }
  }
}
