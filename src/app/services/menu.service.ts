import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from '../models/Menu';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../models/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSubject: BehaviorSubject<Menu> = new BehaviorSubject<Menu>(null);
  private itemBeingViewed: MenuItem;
  public menu$: Observable<Menu> = this.menuSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMenuFromApi();
  }

  private loadMenuFromApi(): void {
    this.http.get<Menu>(environment.backendUrl + "/api/v1/menu").subscribe(menu => this.menuSubject.next(menu));
  }

  public setItemBeingViewed(item: MenuItem): void {
    this.itemBeingViewed = item;
  }

  public getItemBeingViewed(id: string): MenuItem {
    if(this.itemBeingViewed)
      return this.itemBeingViewed;

    this.menuSubject.value.categories.forEach(category => {
      category.items.forEach(item => {
        if(item.id = id) return item;
      });
    });

    return null;
  }
}
