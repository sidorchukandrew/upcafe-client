import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { OrderItem } from 'src/app/models/OrderItem';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { EditItemService } from 'src/app/services/edit-item.service';
import { OrderConfirmation } from 'src/app/models/OrderConfirmation';
import { Time } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentOrder: Order;
  availableTimes: Array<string>;
  selectedTime: string;

  constructor(private orderService: OrderService, private router: Router, private navbarService: NavbarService,
    private editService: EditItemService) {
    this.availableTimes = ['7:00', '7:10', '7:20', '7:30', '7:40', '7:50', '8:00'];
  }

  ngOnInit() {

    this.currentOrder = this.orderService.getCurrentOrder();
    if (this.currentOrder)
      this.selectedTime = this.currentOrder.pickupTime;
    this.navbarService.menuBarHidden = false;
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

    if (this.currentOrder.selectedLineItems.length == 0)
      this.currentOrder = null;
  }

  navigateToMenu(): void {
    this.router.navigate(['user/menu']);
  }

  navigateToEditItem(orderItem: OrderItem) {
    this.editService.unchangedItem = orderItem;
    this.router.navigate(['user/cart/edit', orderItem.variationData.variationId]);
  }

  timeSelected(time: string) {
    this.selectedTime = time;
    this.currentOrder.pickupTime = time;
  }
}
