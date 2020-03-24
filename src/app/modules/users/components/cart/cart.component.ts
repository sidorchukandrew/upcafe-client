import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MenuService } from 'src/app/services/menu.service';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentOrder: Order;

  constructor(private orderService: OrderService, private menuService: MenuService) {
    this.currentOrder = orderService.getCurrentOrder();
    this.menuService.menuBarHidden = false;
  }

  ngOnInit() {
  }

}
