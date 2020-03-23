import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { MenuService } from 'src/app/services/menu.service';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/Category';
import { CatalogByCategory } from 'src/app/models/CatalogByCategory';
import { Catalog } from 'src/app/models/Catalog';
import { CategoryItem } from 'src/app/models/CategoryItem';
import { VariationData } from 'src/app/models/VariationData';

@Component({
  selector: 'app-eats',
  templateUrl: './eats.component.html',
  styleUrls: ['./eats.component.css']
})
export class EatsComponent implements OnInit {

  catalog: Catalog;

  constructor(private http: HttpClient, private catalogService: CatalogService, private menuService: MenuService) {
    this.catalog = {
      catalogSections: Array<CatalogByCategory>()
    };

    this.menuService.menuBarHidden = false;
  }

  ngOnInit() {
    this.loadCatalogByCategory("eats");
  }

  private loadCatalogByCategory(category: string): void {
    this.catalogService.getCatalog(category).subscribe(data => {
      var catalogSection: CatalogByCategory = data;
      console.log(catalogSection);
      this.catalog.catalogSections.push(catalogSection);
    });
  }

  loadItem(lineItem: CategoryItem, variationData: VariationData): void {
    this.menuService.setCurrentLineItem(lineItem, variationData);
  }
}
