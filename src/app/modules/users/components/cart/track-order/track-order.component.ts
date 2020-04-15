import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

enum StatusLevel {
  "ORDER PLACED", "WORKING ON IT", "READY FOR PICKUP"
}

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  status: string;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    console.log(StatusLevel);
    this.orderService.status$.subscribe(status => this.status = status);
  }

}
