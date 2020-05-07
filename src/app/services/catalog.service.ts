import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/Category";
import { Observable } from "rxjs";
import { CatalogByCategory } from "../models/CatalogByCategory";
import { ItemData } from "../models/ItemData";
import { VariationData } from "../models/VariationData";
import { ModifierListData } from "../models/ModifierListData";
import { CategoryItem } from "../models/CategoryItem";
import { environment } from "src/environments/environment";
import { MenuItem } from '../models/MenuItem';

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
}
