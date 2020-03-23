import { Component, OnInit } from '@angular/core';
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
  selectedModifiers: Array<ModifierData>;
  multipleSelectionEnabled: boolean;

  constructor(private menuService: MenuService) {

  }

  ngOnInit() {
    this.modifiers = new Array<ModifierData>();
    this.selectedModifiers = new Array<ModifierData>();

    this.menuService.getCurrentModifierListData().subscribe(data => {
      this.modifiers = data.modifiers;
      this.modifierListData = data;
      this.multipleSelectionEnabled = (this.modifierListData.selectionType == "MULTIPLE");
    });
  }

  public changed(event: any): void {

    var justSelected = this.modifiers.find(function (modifier) {
      return modifier.id == event.source.name;
    });

    (event.checked) ? this.selectedModifiers.push(justSelected) : this.removeById(event.source.name);
    console.log("SELECTED : ");
    console.log(this.selectedModifiers);
  }

  private removeById(id: string): void {
    const index = this.selectedModifiers.findIndex(function (m) {
      return m.id == id;
    });

    if (index > -1)
      this.selectedModifiers.splice(index, 1);
  }

  public selected(id: string): boolean {

    var index = this.selectedModifiers.findIndex(function (m) {
      return (m.id == id);
    });

    return index != -1;
  }

  public getSelectedModifiers(): Array<ModifierData> {
    return this.selectedModifiers;
  }
}
