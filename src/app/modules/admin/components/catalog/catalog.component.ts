import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatalogService } from 'src/app/services/catalog.service';
import { CatalogWhole } from 'src/app/models/CatalogWhole';
import { Modifier } from 'src/app/models/Modifier';
import { ModifierList } from 'src/app/models/ModifierList';
import { MenuItem } from 'src/app/models/MenuItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {

  protected catalog: CatalogWhole;
  protected modifiers: Array<Modifier>;
  protected modifierLists: Array<ModifierList>;
  protected menuItems: Array<MenuItem>;

  private subscriptions: Subscription;

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {

    this.catalogService.loadCatalogIfNotLoadedYet();
    this.subscriptions = new Subscription();

    this.subscriptions.add(this.catalogService.catalog$.subscribe(catalog => this.catalog = catalog));

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
