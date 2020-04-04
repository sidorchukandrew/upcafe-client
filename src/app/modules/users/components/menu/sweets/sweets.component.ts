import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { HttpClient } from '@angular/common/http';
import { CatalogByCategory } from 'src/app/models/CatalogByCategory';
import { Catalog } from 'src/app/models/Catalog';
import { CategoryItem } from 'src/app/models/CategoryItem';
import { VariationData } from 'src/app/models/VariationData';
import { SelectedItemService } from 'src/app/services/selected-item.service';

@Component({
  selector: 'app-sweets',
  templateUrl: './sweets.component.html',
  styleUrls: ['../eats/eats.component.css']
})
export class SweetsComponent implements OnInit {

  catalog: Catalog;

  constructor(private http: HttpClient, private catalogService: CatalogService,
    private selectedItemService: SelectedItemService) {
    this.catalog = {
      catalogSections: Array<CatalogByCategory>()
    };

  }

  ngOnInit() {
    this.loadCatalogByCategory("sweets");
  }

  private loadCatalogByCategory(category: string): void {
    this.catalogService.getCatalog(category).subscribe(data => {
      var catalogSection: CatalogByCategory = data;
      console.log(catalogSection);
      this.catalog.catalogSections.push(catalogSection);
    });
  }

  loadItem(lineItem: CategoryItem, variationData: VariationData): void {
    this.selectedItemService.setSelectedItem(lineItem, variationData);
  }
}
