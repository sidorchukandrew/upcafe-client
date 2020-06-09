import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from '../models/Menu';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSubject: BehaviorSubject<Menu> = new BehaviorSubject<Menu>(null);
  public menu$: Observable<Menu> = this.menuSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMenuFromApi();
  }

  public loadMenuFromApi(): void {
    this.http.get<Menu>(environment.backendUrl + "/api/v1/menu").subscribe(menu => this.menuSubject.next(menu));
  }
}
