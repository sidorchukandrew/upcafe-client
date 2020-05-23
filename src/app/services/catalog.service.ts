import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CatalogInventoryChange } from '../models/CatalogInventoryChange';

@Injectable({
  providedIn: "root",
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  public getCatalogBySection(category: string): Observable<any> {
    return this.http.get(environment.backendUrl + "/catalog", {
      params: {
        category: category,
      },
    });
  }

  public getVariation(id: string) {
    return this.http.get(environment.backendUrl + "/catalog/variations/" + id);
  }

  public getCatalog(): Observable<any> {
    return this.http.get(environment.backendUrl + "/catalogs");
  }

  public updateInventory(inventoryChange: CatalogInventoryChange): Observable<any> {

    console.log(Array.from(inventoryChange.items));
    console.log(Array.from(inventoryChange.modifiers));

    return this.http.put(environment.backendUrl + "/catalog/inventory", {
      "variations": Array.from(inventoryChange.items),
      "modifiers": Array.from(inventoryChange.modifiers)
    });
  }
 }
