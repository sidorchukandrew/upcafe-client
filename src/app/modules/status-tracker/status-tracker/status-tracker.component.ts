import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-status-tracker',
  templateUrl: './status-tracker.component.html',
  styleUrls: ['./status-tracker.component.css']
})
export class StatusTrackerComponent implements OnInit, OnChanges {

  @Input() status: string;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Changes from status tracker : ", changes);
    this.status = changes.status.currentValue;
  }

  ngOnInit() {
  }

}
