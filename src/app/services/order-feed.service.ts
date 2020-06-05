import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class OrderFeedService {

  constructor(private http: HttpClient) { }

  retrieveOrdersByState(date: string, state: string): any {
    return this.http.get<Order[]>(environment.backendUrl + "/orders", {
      params: {
        state: state
      }
    });
  }
}
