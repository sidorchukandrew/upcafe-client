import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarLink } from 'src/app/modules/navbar/components/navbar/navbar.component';
import { PlatformService } from 'src/app/services/platform.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  public isDesktop: boolean = false;
  public links: Array<NavbarLink>;

  private subscriptions: Subscription;

  constructor(private platformService: PlatformService) { }

  ngOnInit() {
    this.links = new Array();
    let cafeLink: NavbarLink = {
      icon: "storefront",
      route: "cafe",
      text: "Cafe"
    };


    let settingsLink: NavbarLink = {
      icon: "person",
      route: "profile",
      text: "Profile"
    }

    this.links.push(cafeLink);
    this.links.push(settingsLink);

    this.subscriptions = new Subscription();
    this.subscriptions.add(this.platformService.isDesktop$.subscribe(isDesktop => this.isDesktop = isDesktop));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
