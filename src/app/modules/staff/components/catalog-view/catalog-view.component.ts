import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CatalogWhole } from 'src/app/models/CatalogWhole';
import { MenuItem } from 'src/app/models/MenuItem';
import { ModifierList } from 'src/app/models/ModifierList';
import { CatalogService } from 'src/app/services/catalog.service';
import { MatDialog } from '@angular/material';
import { CatalogItemDialog } from '../catalog-item-dialog/catalog-item-dialog.component';

@Component({
  selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
  styleUrls: ['./catalog-view.component.css']
})
export class CatalogViewComponent implements OnInit, OnDestroy {

  public darkThemeOn: boolean = false;
  public searchBar: FormControl;

  public catalog: CatalogWhole;

  private subscriptions: Subscription;

  constructor(private themeService: ThemeService, private catalogService: CatalogService,
    private matDialog: MatDialog) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));

    this.searchBar = new FormControl();

    this.catalogService.getCatalog().subscribe(catalogResponse => {
      this.catalog = catalogResponse['catalog'];

      var itemsList: MenuItem[] = new Array<MenuItem>();
      var modifierLists: ModifierList[] = new Array<ModifierList>();

      this.catalog.itemsList.forEach(item => {
        itemsList.push({
          name: item.name,
          description: item.description,
          id: item.id,
          image: item.image,
          inStock: item.inStock,
          modifierLists: null,
          price: item.price
        })
      });

      this.catalog.modifierLists.forEach(modifierList => {
        modifierLists.push({
          id: modifierList.id,
          image: null,
          modifiers: modifierList.modifiers,
          name: modifierList.name,
          selectionType: ''
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public clearSearch(): void {
    this.searchBar.reset();
  }

  public viewCatalogItem(item: MenuItem): void {
    this.matDialog.open(CatalogItemDialog, {
      data: item,
      panelClass: "catalog-item-panel"
    });
  }

}
