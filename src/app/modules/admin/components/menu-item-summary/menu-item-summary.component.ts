import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem';

@Component({
  selector: 'app-menu-item-summary',
  templateUrl: './menu-item-summary.component.html',
  styleUrls: ['./menu-item-summary.component.css']
})
export class MenuItemSummaryComponent implements OnInit {

  @Input("item") menuItem: MenuItem;

  constructor() { }

  ngOnInit() {
    console.log(this.menuItem);
  }

}
