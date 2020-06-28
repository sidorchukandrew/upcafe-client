import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderPlacingService } from "src/app/services/order-placing.service";
import { NavbarLink } from '../../navbar/components/navbar/navbar.component';
import { PlatformService } from 'src/app/services/platform.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HoursService } from 'src/app/services/hours.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {

  public links: Array<NavbarLink>;
  public isDesktop: boolean;

  private subscriptions: Subscription;

  constructor(private ordersService: OrderPlacingService,
    private platformService: PlatformService,
    private hoursService: HoursService,
    private menuService: MenuService,
    private router: Router) {}

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

    this.subscriptions = new Subscription();
    this.subscriptions.add(this.platformService.isDesktop$.subscribe(isDesktop => {
      if(isDesktop) {
        this.router.navigate(["user/switch"]);
      }
    }));

    this.loadCafe();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private loadCafe(): void {
    this.hoursService.loadAvailablePickupTimesFromApi();
    // this.menuService.loadMenuFromApi();
  }
}
