import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.css']
})
export class SegmentedControlComponent implements OnInit {

  @Input("choices") choices: Array<string>;
  @Output("selectionMade") selectionEmitter: EventEmitter<string> = new EventEmitter();

  protected selectedChoice: string;
  constructor() { }

  ngOnInit() {
    this.selectedChoice = this.choices[0];
  }

  protected select(choice: string): void {
    console.log(choice);
    this.selectedChoice = choice;
  }
}
