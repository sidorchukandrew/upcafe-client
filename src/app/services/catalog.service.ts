import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { CatalogInventoryChange } from '../models/CatalogInventoryChange';
import { MenuItem } from '../models/MenuItem';
import { shareReplay } from 'rxjs/operators';
import { CatalogWhole } from '../models/CatalogWhole';

@Injectable({
  providedIn: "root",
})
export class CatalogService {

  private catalog: BehaviorSubject<CatalogWhole> = new BehaviorSubject(null);
  public catalog$: Observable<CatalogWhole> = this.catalog.asObservable();

  constructor(private http: HttpClient) {}

  public getVariation(id: string): Observable<MenuItem> {
    return this.http.get<MenuItem>(environment.backendUrl + "/menu/items/" + id);
  }

  public loadCatalogIfNotLoadedYet(): void {
    if(this.catalog.getValue() == null) {
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
 }
