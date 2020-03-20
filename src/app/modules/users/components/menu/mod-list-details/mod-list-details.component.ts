import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ModifierData } from 'src/app/models/ModifierData';
import { MenuService } from 'src/app/services/menu.service';
import { ModifierListData } from 'src/app/models/ModifierListData';

@Component({
  selector: 'app-mod-list-details',
  templateUrl: './mod-list-details.component.html',
  styleUrls: ['./mod-list-details.component.css']
})
export class ModListDetailsComponent implements OnInit {

  modifiers: Array<ModifierData>;
  modifierListData: ModifierListData;
  selectedModifierIds: Array<string>;
  multipleSelectionEnabled: boolean;

  constructor(private menuService: MenuService) {

  }

  ngOnInit() {
    this.modifiers = new Array<ModifierData>();
    this.menuService.getCurrentModifierListData().subscribe(data => {
      this.modifiers = data.modifiers;
      this.modifierListData = data;


      this.multipleSelectionEnabled = (this.modifierListData.selectionType == "MULTIPLE");
    });

    this.selectedModifierIds = new Array<string>();
  }

  public changed(event: any): void {

    (event.checked) ? this.selectedModifierIds.push(event.source.name) : this.removeId(event.source.name);
    console.log(this.selectedModifierIds);
  }

  private removeId(id: string) {
    const index = this.selectedModifierIds.indexOf(id);
    if (index > -1)
      this.selectedModifierIds.splice(index, 1);
  }
}
