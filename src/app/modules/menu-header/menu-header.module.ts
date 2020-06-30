import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';



@NgModule({
  declarations: [MenuHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MenuHeaderComponent
  ]
})
export class MenuHeaderModule { }
