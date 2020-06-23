import { Component, OnInit } from "@angular/core";
import { OrderPlacingService } from "src/app/services/order-placing.service";
import { HttpClient } from '@angular/common/http';
import { NavbarLink } from '../../navbar/components/navbar/navbar.component';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {

  public links: Array<NavbarLink>;

  constructor(private ordersService: OrderPlacingService, private http: HttpClient) {}

  ngOnInit() {

    let menuLink: NavbarLink = {
      icon: "restaurant_menu",
      route: "menu"
    };

    let cartLink: NavbarLink = {
      icon: "shopping_cart",
      route: "cart"
    };

    let profileLink: NavbarLink = {
      icon: "person",
      route: "account"
    };

    this.links = [menuLink, cartLink, profileLink];

    this.ordersService.checkIfOrderAlreadyPlaced().subscribe();
  }
}
