import { Component, OnInit, Input } from '@angular/core';
import { NavbarLink } from 'src/app/modules/navbar/components/navbar/navbar.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input("links") links: Array<NavbarLink>;
  constructor() { }

  ngOnInit() {
  }

}
