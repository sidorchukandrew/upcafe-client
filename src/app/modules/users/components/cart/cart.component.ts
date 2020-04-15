import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  state$: Observable<string>;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.state$ = this.orderService.state$;

    if (this.orderService.order == null)
      this.orderService.retrieveOrder().subscribe();
  }

}
