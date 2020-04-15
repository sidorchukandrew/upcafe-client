import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModifierData } from 'src/app/models/ModifierData';
import { ModifierListData } from 'src/app/models/ModifierListData';
import { OrderService } from 'src/app/services/order.service';
import { Subscription, Observable } from 'rxjs';
import { EditItemService } from 'src/app/services/edit-item.service';
import { SelectedItemStore } from 'src/app/services/stores/selected-item.store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mod-list-details',
  templateUrl: './mod-list-details.component.html',
  styleUrls: ['./mod-list-details.component.css']
})
export class ModListDetailsComponent implements OnInit, OnDestroy {

  selectedModifiers: Array<ModifierData>;
  multipleSelectionEnabled: boolean;
  subscriptions: Subscription;
  selectedIndex;
  selectedId;

  modListData: ModifierListData;

  constructor(private itemStore: SelectedItemStore, private orderService: OrderService, private editService: EditItemService) {

  }

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.subscriptions.add(this.itemStore.currentModList$
      .subscribe(modListData => {
        this.modListData = modListData;
        if (modListData) {
          this.multipleSelectionEnabled = modListData.selectionType == 'MULTIPLE';
          console.log(this.multipleSelectionEnabled);
        }
      }));

    this.modListData = new ModifierListData('', '', '', []);
    this.selectedModifiers = new Array<ModifierData>();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public changed(checked: boolean, modifier: ModifierData): void {
    (checked) ? this.selectedModifiers.push(modifier) : this.remove(modifier);
    console.log(this.selectedModifiers);
  }

  public remove(modifier: ModifierData): void {
    const index = this.selectedModifiers.indexOf(modifier);
    if (index > -1)
      this.selectedModifiers.splice(index, 1);
  }

  public selected(modifier: ModifierData): boolean {

    var index = this.selectedModifiers.indexOf(modifier);
    return index != -1;
  }

  public changedSingleSelection(modifier: ModifierData, modifiers: ModifierData[]) {

    modifiers.forEach(m => {
      console.log("Removing:", modifier);
      this.remove(modifier);
    });

    this.selectedModifiers.push(modifier);
  }

  public getSelectedModifiers(): Array<ModifierData> {
    return this.selectedModifiers;
  }

  public setSelectedModifiers(modifiers: Array<ModifierData>): void {
    this.selectedModifiers = modifiers;
  }

  display(event) {
    console.log(event);
  }
}
