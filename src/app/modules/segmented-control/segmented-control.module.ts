import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentedControlComponent } from './components/segmented-control/segmented-control.component';



@NgModule({
  declarations: [SegmentedControlComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SegmentedControlComponent
  ]
})
export class SegmentedControlModule { }
