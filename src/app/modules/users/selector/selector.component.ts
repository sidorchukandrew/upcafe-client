import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Modifier } from 'src/app/models/Modifier';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class MultipleSelectorComponent implements OnInit, OnChanges {

  @Input("modifier") modifier: Modifier;
  @Input("on") isOn: boolean = false;
  @Input("disabled") disabled: boolean = false;
  @Output("selectionMade") selectionMade: EventEmitter<SelectionEvent> = new EventEmitter();
  isSelected: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isSelected = this.isOn;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isSelected = changes.isOn.currentValue;
  }

  selected(): void {
    this.isSelected = !this.isSelected;

    this.selectionMade.emit({
      on: this.isSelected,
      modifier: this.modifier
    })
  }
}

export class SelectionEvent {
  modifier: Modifier;
  on: boolean;
}
