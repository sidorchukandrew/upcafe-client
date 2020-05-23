import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { Modifier } from 'src/app/models/Modifier';
import { ModifierList } from 'src/app/models/ModifierList';

@Component({
  selector: 'app-modifier-list-inventory',
  templateUrl: './modifier-list-inventory.component.html',
  styleUrls: ['./modifier-list-inventory.component.css']
})
export class ModifierListInventoryComponent implements OnInit {

  @Input("modifierListCatalog") filteredCatalog: ModifierList[];
  @Output("stockChanged") stockChanged: EventEmitter<Modifier> = new EventEmitter<Modifier>();
  private subscriptions: Subscription;
  darkThemeOn: boolean = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {

    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
  }

  public toggleInStock(modifier: Modifier): void {
    modifier.inStock = !modifier.inStock;
    this.stockChanged.emit(modifier);
  }

}
