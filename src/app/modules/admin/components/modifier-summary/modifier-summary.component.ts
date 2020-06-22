import { Component, OnInit, Input } from '@angular/core';
import { Modifier } from 'src/app/models/Modifier';
import { CatalogService } from 'src/app/services/catalog.service';
import { CatalogObjectTypes } from 'src/app/models/CatalogObjectTypes';
import { ModifierList } from 'src/app/models/ModifierList';
import { CatalogObject } from 'src/app/models/CatalogObject';

@Component({
  selector: 'app-modifier-summary',
  templateUrl: './modifier-summary.component.html',
  styleUrls: ['./modifier-summary.component.css', '../menu-item-summary/menu-item-summary.component.css']
})
export class ModifierSummaryComponent implements OnInit {

  @Input("modifier") modifier: Modifier;

  protected assignedModifierList: CatalogObject;

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.assignedModifierList = this.catalogService.getObjectByIdAndType(this.modifier.modifierListId, CatalogObjectTypes.MODIFIER_LIST);
  }



  public toggleInStock(modifier: Modifier): void {
    modifier.inStock = !modifier.inStock;
  }

}
