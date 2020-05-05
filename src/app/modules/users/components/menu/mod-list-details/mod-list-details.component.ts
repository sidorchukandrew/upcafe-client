import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ModifierData } from 'src/app/models/ModifierData';
import { ModifierListData } from 'src/app/models/ModifierListData';
import { CustomerOrderService } from 'src/app/services/customer-order.service';
import { Subscription, Observable, noop } from 'rxjs';
import { EditItemService } from 'src/app/services/edit-item.service';
import { SelectedItemStore } from 'src/app/services/stores/selected-item.store';
import { tap } from 'rxjs/operators';
import { ModifierList } from 'src/app/models/ModifierList';
import { Modifier } from 'src/app/models/Modifier';

@Component({
  selector: 'app-mod-list-details',
  templateUrl: './mod-list-details.component.html',
  styleUrls: ['./mod-list-details.component.css']
})
export class ModListDetailsComponent implements OnInit {

  @Input("modList") modifierList: ModifierList;
  @Output() selectionMade = new EventEmitter<number>();

  selectedModifiers: Array<ModifierData>;
  multipleSelectionEnabled: boolean;
  selectedIndex;
  selectedId;

  constructor() { }

  ngOnInit() {

    this.selectedModifiers = new Array<ModifierData>();
  }

  public changed(checked: boolean, modifier: Modifier): void {
    if(checked) {
      this.selectedModifiers.push(modifier);

      modifier.price > 0 ? this.selectionMade.emit(modifier.price) : noop;
    }
    else {
      this.remove(modifier);
      modifier.price > 0 ? this.selectionMade.emit(-modifier.price) : noop;
    }
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

  public changedSingleSelection(modifier: Modifier, modifiers: Modifier[]) {

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
