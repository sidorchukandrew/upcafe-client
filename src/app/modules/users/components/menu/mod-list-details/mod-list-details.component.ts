import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ModifierData } from 'src/app/models/ModifierData';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-mod-list-details',
  templateUrl: './mod-list-details.component.html',
  styleUrls: ['./mod-list-details.component.css']
})
export class ModListDetailsComponent implements OnInit {

  modifiers: Array<ModifierData>;

  constructor(private menuService: MenuService) {

  }

  ngOnInit() {
    this.modifiers = new Array<ModifierData>();
    this.menuService.getCurrentModifierList().subscribe(data => {
      this.modifiers = data;
    });
  }

}
