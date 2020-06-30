import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    PageHeaderComponent
  ]
})
export class PageHeaderModule { }
