import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule, MatIconModule, MatDividerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule, RouterModule, ReactiveFormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderWithSearchModule { }
