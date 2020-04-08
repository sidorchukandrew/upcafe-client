import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModifierData } from 'src/app/models/ModifierData';
import { ModifierListData } from 'src/app/models/ModifierListData';
import { OrderService } from 'src/app/services/order.service';
import { SelectedItemService } from 'src/app/services/selected-item.service';
import { Subscription } from 'rxjs';
import { EditItemService } from 'src/app/services/edit-item.service';

@Component({
  selector: 'app-mod-list-details',
  templateUrl: './mod-list-details.component.html',
  styleUrls: ['./mod-list-details.component.css']
})
export class ModListDetailsComponent implements OnInit, OnDestroy {

  modifiers: Array<ModifierData>;
  modifierListData: ModifierListData;
  selectedModifiers: Array<ModifierData>;
  multipleSelectionEnabled: boolean;
  subscriptions: Subscription;
  selectedIndex;
  selectedId;

  constructor(private selectedItemService: SelectedItemService, private orderService: OrderService, private editService: EditItemService) {

  }

  ngOnInit() {
    this.modifiers = new Array<ModifierData>();
    this.selectedModifiers = new Array<ModifierData>();

    if (this.editService.unchangedItem) {
      this.selectedModifiers = this.editService.unchangedItem.selectedModifiers;
    }

    this.subscriptions = new Subscription();

    this.subscriptions.add(this.selectedItemService.getSelectedModifierListData().subscribe(data => {
      this.modifiers = data.modifiers;
      this.modifierListData = data;
      this.multipleSelectionEnabled = (this.modifierListData.selectionType == "MULTIPLE");
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
