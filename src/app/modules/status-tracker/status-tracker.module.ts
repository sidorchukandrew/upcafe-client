import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusTrackerComponent } from './status-tracker/status-tracker.component';
import { MatDividerModule } from '@angular/material';



@NgModule({
  declarations: [
    StatusTrackerComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule
  ],
  exports: [
    StatusTrackerComponent
  ]
})
export class StatusTrackerModule { }
