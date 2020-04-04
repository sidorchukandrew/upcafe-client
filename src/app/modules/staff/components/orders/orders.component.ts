import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  selectedOrdersView: string;
  showOptions: boolean;


  constructor(private router: Router) { }

  ngOnInit() {
    this.selectedOrdersView = "Up Next";
    this.router.navigate(['staff/orders/new']);

  }

  selectOrderView(view: string): void {
    this.selectedOrdersView = view;
  }

}
