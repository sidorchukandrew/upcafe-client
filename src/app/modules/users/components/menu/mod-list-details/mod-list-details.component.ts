import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
// import { ModifierData } from 'src/app/models/ModifierData';
import { noop } from 'rxjs';
import { ModifierList } from 'src/app/models/ModifierList';
import { Modifier } from 'src/app/models/Modifier';
import { OrderModifier } from 'src/app/models/OrderModifier';

@Component({
  selector: "app-mod-list-details",
  templateUrl: "./mod-list-details.component.html",
  styleUrls: ["./mod-list-details.component.css"],
})
export class ModListDetailsComponent implements OnInit {
  @Input("modList") modifierList: ModifierList;
  @Output() priceAdjusted = new EventEmitter<number>();

  selectedModifiers: Array<OrderModifier>;
  multipleSelectionEnabled: boolean;
  selectedIndex;
  selectedId;


  constructor() {}

  ngOnInit() {
    this.selectedModifiers = new Array<OrderModifier>();
  }

  public changed(checked: boolean, modifier: Modifier): void {
    if (checked) {
      var orderModifier: OrderModifier = {
        id: modifier.id,
        name: modifier.name,
        price: modifier.price,
      };

      this.selectedModifiers.push(orderModifier);

      console.log(this.selectedModifiers);

      modifier.price > 0 ? this.priceAdjusted.emit(modifier.price) : noop;
    } else {
      this.remove(modifier);
      modifier.price > 0 ? this.priceAdjusted.emit(-modifier.price) : noop;
    }
  }

  public remove(modifier: Modifier): void {

    const index = this.selectedModifiers.findIndex(orderModifier => orderModifier.id == modifier.id);
    if (index > -1)
      this.selectedModifiers.splice(index, 1);
  }

  public selected(modifier: Modifier): boolean {
    const index = this.selectedModifiers.findIndex(orderModifier => orderModifier.id == modifier.id);
    return index != -1;
  }

  public changedSingleSelection(modifier: Modifier, modifiers: Modifier[]) {
    modifiers.forEach((m) => {
      this.remove(m);
    });

    var orderModifier: OrderModifier = {
      id: modifier.id,
      name: modifier.name,
      price: modifier.price,
    };

    this.selectedModifiers.push(orderModifier);

    console.log(this.selectedModifiers);
  }

  public getSelectedModifiers(): Array<OrderModifier> {
    return this.selectedModifiers;
  }


  display(event) {
    console.log(event);
  }
}
