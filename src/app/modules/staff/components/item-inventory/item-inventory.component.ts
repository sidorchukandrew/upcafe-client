import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-item-inventory',
  templateUrl: './item-inventory.component.html',
  styleUrls: ['./item-inventory.component.css']
})
export class ItemInventoryComponent implements OnInit {

  @Input("itemCatalog") filteredCatalog: MenuItem[];
  @Output("stockChanged") stockChanged: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();
  private subscriptions: Subscription;
  darkThemeOn: boolean = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {

    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
  }

  public toggleInStock(item: MenuItem): void {
    item.inStock = !item.inStock;
    this.stockChanged.emit(item);
  }

}
