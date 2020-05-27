import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-tracker',
  templateUrl: './status-tracker.component.html',
  styleUrls: ['./status-tracker.component.css']
})
export class StatusTrackerComponent implements OnInit {

  @Input() status: string;
  constructor() { }

  ngOnInit() {
  }

}
