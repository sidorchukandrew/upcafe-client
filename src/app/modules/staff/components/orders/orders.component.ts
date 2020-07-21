import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { OrdersStore } from 'src/app/stores/orders.store';
import { Subscription } from 'rxjs';
import { MatCalendarCellCssClasses } from '@angular/material';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit, OnDestroy {
  selectedOrdersView: string;
  private subscriptions: Subscription;
  public loadingOrders: boolean = false;
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'highlight' : '';
  };

  public selectedDate: string;

  constructor(private router: Router, private ordersStore: OrdersStore) {}

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.subscriptions.add(this.ordersStore.ordersAreLoading().subscribe(loading => this.loadingOrders = loading));
    this.router.navigate(["staff/orders/new"]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  selectOrderView(view: string): void {
    this.selectedOrdersView = view;
  }
}
