import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Modifier } from 'src/app/models/Modifier';
import { SelectionEvent } from '../../selector/selector.component';
import { ModifierList } from 'src/app/models/ModifierList';

@Component({
  selector: 'app-single-selection-group',
  templateUrl: './single-selection-group.component.html',
  styleUrls: ['./single-selection-group.component.css']
})
export class SingleSelectionGroupComponent implements OnInit, OnChanges {

  @Input("modifierList") modifierList: ModifierList;
  @Input("on") modifierAlreadyOn: Modifier;
  @Output("selectionMade") selectionMade: EventEmitter<SelectionEvent> = new EventEmitter();

  selectedModifier: Modifier;

  constructor() { }

  ngOnInit() {
    if (this.modifierAlreadyOn) this.selectedModifier = this.modifierAlreadyOn;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.modifierList) this.selectedModifier = null;
    if (this.modifierAlreadyOn) this.selectedModifier = this.modifierAlreadyOn;
  }

  public toggleSelection(selectionEvent: SelectionEvent) {

    console.log("selection made : ", selectionEvent);

    if(!selectionEvent.on) {
      this.selectionMade.emit(selectionEvent);
      this.selectedModifier = null;
    }
    else {
      if(this.selectedModifier) {
        console.log("emitting a removal");
        this.selectionMade.emit({
          on: false,
          modifier: this.selectedModifier
        });
      }

      this.selectionMade.emit({
        on: true,
        modifier: selectionEvent.modifier
      });

      this.selectedModifier = selectionEvent.modifier;
    }
  }
}
