import { CatalogService } from "./catalog.service";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from 'src/environments/environment';
import { CatalogWhole } from '../models/CatalogWhole';
import { MenuItem } from '../models/MenuItem';
import { CatalogObjectTypes } from '../models/CatalogObjectTypes';
import { ModifierList } from '../models/ModifierList';
import { Modifier } from '../models/Modifier';

fdescribe("CatalogService", () => {

  let catalogService: CatalogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CatalogService
      ]
    });

    catalogService = TestBed.get(CatalogService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it("should get the catalog", () => {

    const EVERYTHING_SEASONING_MODIFIER: Modifier = {id: "MODIFIER_1", image: null, name: "Everything Seasoning", inStock: true,
      modifierListId: "MOD_LIST_1", price: 0, onByDefault: true};

    const TWENTY_ONE_MODIFIER: Modifier = {
      id: "MODIFIER_2", image: null, name: "Twenty One Seasoning", inStock: true,
      modifierListId: "MOD_LIST_1", price: 0, onByDefault: false
    };

    const MODIFIER_LISTS: Array<ModifierList> = [{id: "MOD_LIST_1", image: null, name: "Seasonings", selectionType: "SINGLE",
      type: CatalogObjectTypes.MODIFIER_LIST, modifiers: [EVERYTHING_SEASONING_MODIFIER, TWENTY_ONE_MODIFIER]}];

    const ITEMS: Array<MenuItem> = [{
      id: "ITEM_1", description: "", name: "Avocado Toast", image: null, inStock: true,
      price: 2, type: CatalogObjectTypes.MENU_ITEM, modifierLists: MODIFIER_LISTS
    }];
    const CATALOG: CatalogWhole = {
      itemsList: ITEMS,
      modifierLists: MODIFIER_LISTS
    };

    catalogService.getCatalog().subscribe(catalogResponse => {
      expect(catalogResponse).toBeTruthy();

      const catalog: CatalogWhole = catalogResponse.catalog;

      expect(catalog).toBeTruthy();

      expect(catalog.itemsList.length).toBe(1);
      expect(catalog.modifierLists.length).toBe(1);

      expect(catalog.itemsList[0].id).toBe("ITEM_1");
      expect(catalog.itemsList[0].description).toBe("");
      expect(catalog.itemsList[0].name).toBe("Avocado Toast");
      expect(catalog.itemsList[0].inStock).toBe(true);
      expect(catalog.itemsList[0].price).toBe(2);
      expect(catalog.itemsList[0].image).toBeFalsy();
      expect(catalog.itemsList[0].modifierLists.length).toBe(1);

      expect(catalog.modifierLists[0].id).toBe("MOD_LIST_1");
      expect(catalog.modifierLists[0].name).toBe("Seasonings");
      expect(catalog.modifierLists[0].image).toBeFalsy();
      expect(catalog.modifierLists[0].selectionType).toBe("SINGLE");
      expect(catalog.modifierLists[0].modifiers.length).toBe(2);

      expect(catalog.modifierLists[0].modifiers[0].id).toBe("MODIFIER_1");
      expect(catalog.modifierLists[0].modifiers[0].name).toBe("Everything Seasoning");
      expect(catalog.modifierLists[0].modifiers[0].price).toBe(0);
      expect(catalog.modifierLists[0].modifiers[0].onByDefault).toBe(true);
      expect(catalog.modifierLists[0].modifiers[0].inStock).toBe(true);
      expect(catalog.modifierLists[0].modifiers[0].image).toBeFalsy();
    });

    const testRequest = httpTestingController.expectOne(environment.backendUrl + "/api/v1/catalog");
    expect(testRequest.request.method).toBe("GET");
    testRequest.flush({catalog: CATALOG});
  });

  xit("should get the object based on the object's id and type", () => {
    catalogService.getCatalog().subscribe(() => {

    });

    const testRequest = httpTestingController.expectOne(environment.backendUrl + "/api/v1/catalog");

    testRequest.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
