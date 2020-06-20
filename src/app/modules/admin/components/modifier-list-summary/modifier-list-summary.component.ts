import { Component, OnInit, Input } from '@angular/core';
import { ModifierList } from 'src/app/models/ModifierList';

@Component({
  selector: 'app-modifier-list-summary',
  templateUrl: './modifier-list-summary.component.html',
  styleUrls: ['./modifier-list-summary.component.css']
})
export class ModifierListSummaryComponent implements OnInit {

  @Input("modifierList") modifierList: ModifierList;

  constructor() { }

  ngOnInit() {
  }

}
