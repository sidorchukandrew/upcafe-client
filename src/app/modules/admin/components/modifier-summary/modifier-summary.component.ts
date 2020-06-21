import { Component, OnInit, Input } from '@angular/core';
import { Modifier } from 'src/app/models/Modifier';

@Component({
  selector: 'app-modifier-summary',
  templateUrl: './modifier-summary.component.html',
  styleUrls: ['./modifier-summary.component.css', '../menu-item-summary/menu-item-summary.component.css']
})
export class ModifierSummaryComponent implements OnInit {

  @Input("modifier") modifier: Modifier;

  constructor() { }

  ngOnInit() {
  }

}
