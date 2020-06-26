import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatIconModule, MatDividerModule } from '@angular/material';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatDividerModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { }
