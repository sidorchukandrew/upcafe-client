import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, noop } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';
import { TimeUtilitiesService } from '../time-utilities.service';


declare var SockJS;
declare var Stomp;


@Injectable({
  providedIn: 'root'
})
export class OrdersStore {

  private stompClient;
  private subject: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  orders$: Observable<Order[]> = this.subject.asObservable();

  constructor(private http: HttpClient, private utils: TimeUtilitiesService) {
    this.initializeWebSocketConnection();
  }

  loadOrdersFromAPI(date: string): void {
    const loadOrders$ = this.http.get<Order[]>(environment.backendUrl + '/orders',
      {
        params: { date: date }
      })
      .pipe(
        tap(orders => this.subject.next(orders)),
      );

    loadOrders$.subscribe();
  }

  selectNewOrders(): Observable<Order[]> {
    return this.filterOrdersByState('ORDER PLACED');
  }

  selectActiveOrders(): Observable<Order[]> {
    return this.filterOrdersByState('ACTIVE');
  }

  selectReadyOrders(): Observable<Order[]> {
    return this.filterOrdersByState('READY');
  }

  selectCompleteOrders(): Observable<Order[]> {
    return this.filterOrdersByState('COMPLETE');
  }

  filterOrdersByState(state: string): Observable<Order[]> {
    return this.orders$.pipe(
      map(orders => orders.filter(order => order.state == state)),
      map(orders => orders.sort(this.utils.increasingTime))
    );
  }

  private initializeWebSocketConnection(): void {
    const serverUrl = environment.backendUrl + '/gs-guide-websocket';
    const ws = new SockJS(serverUrl);

    this.stompClient = Stomp.over(ws);

    const that = this;

    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/new', (message) => {
        that.loadOrdersFromAPI(new Date().toDateString());
      });

      that.stompClient.subscribe('/active', (message) => {
        that.loadOrdersFromAPI(new Date().toDateString());
      });

      that.stompClient.subscribe('/ready', (message) => {
        that.loadOrdersFromAPI(new Date().toDateString());
      });

      that.stompClient.subscribe('/complete', (message) => {
        that.loadOrdersFromAPI(new Date().toDateString());
      });
    });
  }

  public sendUpdate(order: Order, state: string): any {
    return this.http.post(environment.backendUrl + "/orders", order, {
      params: { state: state }
    });
  }
}
