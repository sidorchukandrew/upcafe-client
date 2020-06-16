import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ModifierList } from 'src/app/models/ModifierList';
import { Modifier } from 'src/app/models/Modifier';
import { OrderModifier } from 'src/app/models/OrderModifier';
import { SelectionEvent } from '../../selector/selector.component';

@Component({
  selector: 'app-modifier-list',
  templateUrl: './modifier-list.component.html',
  styleUrls: ['./modifier-list.component.css']
})
export class ModifierListComponent implements OnInit {

  @Input("modList") modifierList: ModifierList;
  @Input("selectedModifiers") orderModifiers: Array<OrderModifier>;
  @Output("priceAdjusted") priceAdjusted = new EventEmitter<number>();
  @Output("listChange") listChange: EventEmitter<Array<OrderModifier>> = new EventEmitter();

  selectedModifiers: Array<OrderModifier>;

  constructor() { }

  ngOnInit() {
    this.selectedModifiers = new Array<OrderModifier>();
    if (this.orderModifiers) this.selectedModifiers = this.orderModifiers;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes");
    if (changes.orderModifiers) this.orderModifiers = changes.orderModifiers.currentValue;
  }

  public remove(modifier: Modifier): void {

    const index = this.selectedModifiers.findIndex(orderModifier => orderModifier.id == modifier.id);
    if (index > -1)
      this.selectedModifiers.splice(index, 1);
  }

  public alreadySelected(modifier: Modifier): boolean {
    const index = this.selectedModifiers.findIndex(orderModifier => orderModifier.id == modifier.id);
    return index != -1;
  }

  public getSelectedModifiers(): Array<OrderModifier> {
    return this.selectedModifiers;
  }

  public selectionMade(selection: SelectionEvent) {
    if (selection.on) {
      this.selectedModifiers.push({
        id: selection.modifier.id,
        name: selection.modifier.name,
        price: selection.modifier.price
      });
      this.priceAdjusted.emit(selection.modifier.price);
    }
    else {
      console.log("REMOVING : ", selection);
      this.remove(selection.modifier);
      this.priceAdjusted.emit(-selection.modifier.price);
    }

    console.log(this.selectedModifiers);
    this.listChange.emit(this.selectedModifiers);
  }

  public modifierInListAlreadySelected(modifierList: ModifierList): Modifier {

    var selectedModifiersInThisList: Array<Modifier> = new Array<Modifier>();
    modifierList.modifiers.forEach(modifierInList => {

      if (this.alreadySelected(modifierInList)) selectedModifiersInThisList.push(modifierInList);
    });

    if (selectedModifiersInThisList.length == 1) return selectedModifiersInThisList[0];


    return null;
  }

  display(event) {
    console.log(event);
  }
}
