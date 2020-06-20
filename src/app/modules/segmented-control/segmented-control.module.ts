import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentedControlComponent } from './components/segmented-control/segmented-control.component';
import { MatDividerModule } from '@angular/material';



@NgModule({
  declarations: [SegmentedControlComponent],
  imports: [
    CommonModule,
    MatDividerModule
  ],
  exports: [
    SegmentedControlComponent
  ]
})
export class SegmentedControlModule { }
