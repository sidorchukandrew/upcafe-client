import { Component, OnInit } from '@angular/core';
import { NavbarLink } from 'src/app/modules/navbar/components/navbar/navbar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public links: Array<NavbarLink>;
  constructor() { }

  ngOnInit() {
    this.links = new Array();
    let cafeLink: NavbarLink = {
      icon: "storefront",
      route: "cafe"
    };


    let settingsLink: NavbarLink = {
      icon: "person",
      route: "profile"
    }

    this.links.push(cafeLink);
    this.links.push(settingsLink);
  }

}
