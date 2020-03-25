import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { HttpClient } from '@angular/common/http';
import { CatalogByCategory } from 'src/app/models/CatalogByCategory';
import { Catalog } from 'src/app/models/Catalog';
import { CategoryItem } from 'src/app/models/CategoryItem';
import { VariationData } from 'src/app/models/VariationData';
import { SelectedItemService } from 'src/app/services/selected-item.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['../eats/eats.component.css']
})
export class DrinksComponent implements OnInit {

  catalog: Catalog;

  constructor(private http: HttpClient, private catalogService: CatalogService, private navbarService: NavbarService,
    private selectedItemService: SelectedItemService) {
    this.catalog = {
      catalogSections: Array<CatalogByCategory>()
    };

    this.navbarService.menuBarHidden = false;
  }

  ngOnInit() {
    this.loadCatalogByCategory("drinks");
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
