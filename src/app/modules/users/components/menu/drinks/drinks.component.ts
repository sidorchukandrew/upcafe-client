import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { HttpClient } from '@angular/common/http';
import { CatalogByCategory } from 'src/app/models/CatalogByCategory';
import { Catalog } from 'src/app/models/Catalog';
import { CategoryItem } from 'src/app/models/CategoryItem';
import { VariationData } from 'src/app/models/VariationData';
import { SelectedItemStore } from 'src/app/services/stores/selected-item.store';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['../eats/eats.component.css']
})
export class DrinksComponent implements OnInit {


  catalog: Catalog;

  constructor(private catalogService: CatalogService,
    private itemStore: SelectedItemStore) {
    this.catalog = {
      catalogSections: Array<CatalogByCategory>()
    };

  }

  ngOnInit() {
    // this.loadCatalogByCategory("sandwiches");
    // this.loadCatalogByCategory("soups");
    // this.loadCatalogByCategory("pizzas");
  }

  private loadCatalogByCategory(category: string): void {
    this.catalogService.getCatalog(category).subscribe(data => {
      var catalogSection: CatalogByCategory = data;
      this.catalog.catalogSections.push(catalogSection);
      console.log(this.catalog);
    });
  }

  loadItem(lineItem: CategoryItem, variationData: VariationData): void {
    this.itemStore.setSelectedItem(lineItem, variationData);
  }
}