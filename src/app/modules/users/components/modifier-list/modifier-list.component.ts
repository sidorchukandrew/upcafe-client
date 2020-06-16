import { Component, OnInit, Input } from '@angular/core';
import { ModifierList } from 'src/app/models/ModifierList';

@Component({
  selector: 'app-modifier-list',
  templateUrl: './modifier-list.component.html',
  styleUrls: ['./modifier-list.component.css']
})
export class ModifierListComponent implements OnInit {

  @Input("modifierList") modifierList: ModifierList;
  constructor() { }

  ngOnInit() {
  }

}
