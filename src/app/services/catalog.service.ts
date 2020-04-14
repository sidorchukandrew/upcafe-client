import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';
import { CatalogByCategory } from '../models/CatalogByCategory';
import { ItemData } from '../models/ItemData';
import { VariationData } from '../models/VariationData';
import { ModifierListData } from '../models/ModifierListData';
import { CategoryItem } from '../models/CategoryItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  public getCatalog(category: string): any {
    return this.http.get(environment.backendUrl + "/catalog/" + category);
  }

  public getEats(): any {
    return this.http.get(environment.backendUrl + "/catalog/eats");
  }

  public getVariation(id: string) {
    return this.http.get(environment.backendUrl + "/catalog/variations/" + id);
  }
}
