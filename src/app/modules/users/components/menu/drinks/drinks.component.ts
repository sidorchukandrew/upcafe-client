import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { HttpClient } from '@angular/common/http';
import { CatalogByCategory } from 'src/app/models/CatalogByCategory';
import { Catalog } from 'src/app/models/Catalog';
import { SelectedItemStore } from 'src/app/stores/selected-item.store';
import { Subscription } from 'rxjs';
import { map, tap, concat } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['../eats/eats.component.css']
})
export class DrinksComponent
// implements OnInit
{

  // catalog: Catalog;
  // private subscriptions: Subscription;

  // constructor(private catalogService: CatalogService,
  //   private itemStore: SelectedItemStore,
  //   private loadingService: LoadingService) {}

  // ngOnInit() {
  //   this.subscriptions = new Subscription();
  //   this.catalog = { catalogSections: Array<CatalogByCategory>() };

  //   var hotCoffees$ = this.catalogService
  //     .getCatalogBySection("hot coffees")
  //     .pipe(
  //       map((response) => response["items"]),
  //       tap((section) => {
  //         var catalogSection: CatalogByCategory = {
  //           category: "Hot Coffees",
  //           menuItems: section,
  //         };
  //         this.catalog.catalogSections.push(catalogSection);
  //       })
  //     );

  //     var hotTeas$ = this.catalogService
  //       .getCatalogBySection("hot teas")
  //       .pipe(
  //         map((response) => response["items"]),
  //         tap((section) => {
  //           var catalogSection: CatalogByCategory = {
  //             category: "Hot Teas",
  //             menuItems: section,
  //           };
  //           this.catalog.catalogSections.push(catalogSection);
  //         })
  //       );

  //       var icedTeas$ = this.catalogService
  //         .getCatalogBySection("iced teas")
  //         .pipe(
  //           map((response) => response["items"]),
  //           tap((section) => {
  //             var catalogSection: CatalogByCategory = {
  //               category: "Iced Teas",
  //               menuItems: section,
  //             };
  //             this.catalog.catalogSections.push(catalogSection);
  //           })
  //         );

  //      var icedCoffees$ = this.catalogService
  //        .getCatalogBySection("iced coffees")
  //        .pipe(
  //          map((response) => response["items"]),
  //          tap((section) => {
  //            var catalogSection: CatalogByCategory = {
  //              category: "Iced Coffees",
  //              menuItems: section,
  //            };
  //            this.catalog.catalogSections.push(catalogSection);
  //          })
  //        );

  //        var lemonades$ = this.catalogService
  //        .getCatalogBySection("lemonades")
  //        .pipe(
  //          map((response) => response["items"]),
  //          tap((section) => {
  //            var catalogSection: CatalogByCategory = {
  //              category: "Lemonades",
  //              menuItems: section,
  //            };
  //            this.catalog.catalogSections.push(catalogSection);
  //          })
  //        );

  //      var softDrinks$ = this.catalogService
  //        .getCatalogBySection("soft drinks")
  //        .pipe(
  //          map((response) => response["items"]),
  //          tap((section) => {
  //            var catalogSection: CatalogByCategory = {
  //              category: "Soft Drinks",
  //              menuItems: section,
  //            };
  //            this.catalog.catalogSections.push(catalogSection);
  //          })
  //        );

  //      var otherDrinks$ = this.catalogService
  //        .getCatalogBySection("other drinks")
  //        .pipe(
  //          map((response) => response["items"]),
  //          tap((section) => {
  //            var catalogSection: CatalogByCategory = {
  //              category: "Other Drinks",
  //              menuItems: section,
  //            };
  //            this.catalog.catalogSections.push(catalogSection);
  //          })
  //        );

  //      var loadCatalog$ = this.loadingService.showLoadingUntilComplete(
  //        hotCoffees$.pipe(concat(hotTeas$, icedCoffees$, icedTeas$, lemonades$, softDrinks$, otherDrinks$))
  //      );

  //      this.subscriptions.add(loadCatalog$.subscribe());
  // }

  // private loadCatalogByCategory(category: string): void {
  //   this.catalogService.getCatalogBySection(category).subscribe(data => {
  //     var catalogSection: CatalogByCategory = data;
  //     this.catalog.catalogSections.push(catalogSection);
  //     console.log(this.catalog);
  //   });
  // }

  // loadItem(lineItem: CategoryItem, variationData: VariationData): void {
  //   // this.itemStore.setSelectedItem(lineItem, variationData);
  // }
}
