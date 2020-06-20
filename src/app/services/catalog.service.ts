import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CatalogInventoryChange } from '../models/CatalogInventoryChange';
import { MenuItem } from '../models/MenuItem';

@Injectable({
  providedIn: "root",
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  public getVariation(id: string): Observable<MenuItem> {
    return this.http.get<MenuItem>(environment.backendUrl + "/menu/items/" + id);
  }

  public getCatalog(): Observable<any> {
    return this.http.get(environment.backendUrl + "/api/v1/catalog");
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
 }
