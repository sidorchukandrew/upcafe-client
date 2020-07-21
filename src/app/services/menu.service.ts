import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from '../models/Menu';
import { environment } from '../../environments/environment';
import { MenuItem } from '../models/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSubject: BehaviorSubject<Menu> = new BehaviorSubject<Menu>(null);
  private itemBeingViewed: MenuItem;
  private menu$: Observable<Menu> = this.menuSubject.asObservable();
  private loadingMenu: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient) { }

  public loadMenuFromApi(): void {
    if(this.menuSubject.value == null) {
      this.loadingMenu.next(true);
      this.http.get<Menu>(environment.backendUrl + "/api/v1/menu").subscribe(
        (menu) => {
          this.menuSubject.next(menu);
          this.loadingMenu.next(false);
        },
        error => this.loadingMenu.next(false));
    }
  }

  public menuIsBeingLoaded(): Observable<boolean> {
    return this.loadingMenu.asObservable();
  }

  public getMenu(): Observable<Menu> {
    return this.menu$;
  }

  public setItemBeingViewed(item: MenuItem): void {
    this.itemBeingViewed = item;
  }

  public getItemBeingViewed(id: string): MenuItem {

    if(this.itemBeingViewed)
      return this.itemBeingViewed;

    this.menuSubject.value.categories.forEach(category => {
      category.items.forEach(item => {
        if(item.id == id) {
            this.itemBeingViewed = item;
        }
      });
    });

    return this.itemBeingViewed;
  }
}
