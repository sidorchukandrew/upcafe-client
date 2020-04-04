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
    return this.http.get("http://192.168.0.7:8080/catalog/" + category);
  }

  public getVariation(id: string) {
    return this.http.get("http://192.168.0.7:8080/catalog/variations/" + id);
  }
}
