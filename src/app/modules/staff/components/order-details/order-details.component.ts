import { Component, OnInit } from '@angular/core';
import { OrdersDetailsStore } from 'src/app/services/stores/order-details.store';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  constructor(public detailsStore: OrdersDetailsStore, private router: Router, private location: Location) { }

  ngOnInit() {

    console.log(this.detailsStore.orderBeingViewed);
    if(!!!this.detailsStore.orderBeingViewed) {
      this.router.navigate(["staff/orders/new"]);
    }
  }

  back() {
    this.location.back();
  }

}
