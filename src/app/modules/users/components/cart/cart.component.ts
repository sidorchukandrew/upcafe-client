import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MenuService } from 'src/app/services/menu.service';
import { Order } from 'src/app/models/Order';
import { OrderItem } from 'src/app/models/OrderItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentOrder: Order;
  subtotal: number;
  tax: number;

  constructor(private orderService: OrderService, private menuService: MenuService, private router: Router) {
    this.currentOrder = orderService.getCurrentOrder();
    this.menuService.menuBarHidden = false;

    if (orderService.getCurrentOrder()) {
      this.subtotal = orderService.getCurrentOrder().totalPrice;
      this.tax = this.subtotal * .08;
    }
  }

  ngOnInit() {
  }

  incrementQuantity(orderItem: OrderItem): void {
    orderItem.incrementQuantity();
    this.currentOrder.totalPrice += orderItem.price;
  }

  decrementQuantity(orderItem: OrderItem): void {
    if (orderItem.decrementQuantity()) {
      this.currentOrder.totalPrice -= orderItem.price
    }
  }

  removeFromOrder(orderItem: OrderItem): void {
    var index = this.currentOrder.selectedLineItems.indexOf(orderItem);
    this.currentOrder.selectedLineItems.splice(index, 1);

    var newPrice: number = 0;
    this.currentOrder.selectedLineItems.forEach(item => {
      newPrice += (item.price * item.quantity);
    });

    this.currentOrder.totalPrice = newPrice;
    this.tax = this.currentOrder.totalPrice * .08;

    if (this.currentOrder.selectedLineItems.length == 0)
      this.currentOrder = null;
  }

  navigateToMenu(): void {
    this.router.navigate(['user/menu']);
  }
}
