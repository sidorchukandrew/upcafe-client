import { Component, OnInit } from '@angular/core';
import { OrderFeedService } from 'src/app/services/order-feed.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private ordersFeed: OrderFeedService) { }

  ngOnInit() {
    this.ordersFeed.getOrdersByState('ORDER PLACED').subscribe(newIncomingOrdersList => {
      this.ordersFeed.setNewOrdersObservableList(newIncomingOrdersList);
    });

  }

}
