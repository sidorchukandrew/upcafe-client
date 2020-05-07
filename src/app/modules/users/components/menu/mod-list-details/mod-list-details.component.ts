import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ModifierData } from 'src/app/models/ModifierData';
import { noop } from 'rxjs';
import { ModifierList } from 'src/app/models/ModifierList';
import { Modifier } from 'src/app/models/Modifier';
import { OrderModifier } from 'src/app/models/OrderModifier';

@Component({
  selector: 'app-mod-list-details',
  templateUrl: './mod-list-details.component.html',
  styleUrls: ['./mod-list-details.component.css']
})
export class ModListDetailsComponent implements OnInit {

  @Input("modList") modifierList: ModifierList;
  @Output() selectionMade = new EventEmitter<number>();

  selectedModifiers: Array<OrderModifier>;
  multipleSelectionEnabled: boolean;
  selectedIndex;
  selectedId;

  constructor() { }

  ngOnInit() {

    this.selectedModifiers = new Array<OrderModifier>();
  }

  public changed(checked: boolean, modifier: Modifier): void {
    if(checked) {
      var orderModifier: OrderModifier = {
        id: modifier.id,
        name: modifier.name,
        price: modifier.price
      }

      this.selectedModifiers.push(orderModifier);

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

  public getSelectedModifiers(): Array<OrderModifier> {
    return this.selectedModifiers;
  }

  display(event) {
    console.log(event);
  }
}
