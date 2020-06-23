import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input("links") links: Array<NavbarLink>;

  public linkWidth: string = "{width: 100%}";
  constructor() { }

  ngOnInit() {
  }

}

export class NavbarLink {
  route: string;
  icon: string;
}
