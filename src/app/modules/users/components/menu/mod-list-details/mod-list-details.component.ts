import { Component, OnInit } from '@angular/core';
import { ModifierData } from 'src/app/models/ModifierData';
import { ModifierListData } from 'src/app/models/ModifierListData';
import { OrderService } from 'src/app/services/order.service';
import { SelectedItemService } from 'src/app/services/selected-item.service';
import { Subscription, Observable } from 'rxjs';
import { EditItemService } from 'src/app/services/edit-item.service';
import { SelectedItemStore } from 'src/app/services/stores/selected-item.store';

@Component({
  selector: 'app-mod-list-details',
  templateUrl: './mod-list-details.component.html',
  styleUrls: ['./mod-list-details.component.css']
})
export class ModListDetailsComponent implements OnInit {

  modifiers: Array<ModifierData>;
  modifierListData: ModifierListData;
  selectedModifiers: Array<ModifierData>;
  multipleSelectionEnabled: boolean;
  subscriptions: Subscription;
  selectedIndex;
  selectedId;

  modListData$: Observable<ModifierListData>;

  constructor(private itemStore: SelectedItemStore, private orderService: OrderService, private editService: EditItemService) {

  }

  ngOnInit() {

    this.modListData$ = this.itemStore.currentModList$;
    this.selectedModifiers = new Array<ModifierData>();
  }

  public changed(event: any): void {

    var justSelected = this.modifiers.find(function (modifier) {
      return modifier.id == event.source.name;
    });

    (event.checked) ? this.selectedModifiers.push(justSelected) : this.removeById(event.source.name);
    console.log(this.orderService.editingItem);
  }

  public removeById(id: string): void {
    const index = this.selectedModifiers.findIndex(function (m) {
      return m.id == id;
    });

    if (index > -1)
      this.selectedModifiers.splice(index, 1);
  }

  public selected(id: string): boolean {

    var index = this.selectedModifiers.findIndex(function (m) {
      return (m.id == id);
    });

    return index != -1;
  }

  public getSelectedModifiers(): Array<ModifierData> {
    return this.selectedModifiers;
  }

  public setSelectedModifiers(modifiers: Array<ModifierData>): void {
    this.selectedModifiers = modifiers;
  }
}
