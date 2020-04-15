import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  state: string;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.state$.subscribe(state => this.state = state);

    // // Only retrieve it if the order state is placed
    this.orderService.checkIfOrderAlreadyPlaced().subscribe();
  }

}
