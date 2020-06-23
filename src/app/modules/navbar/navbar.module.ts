import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent, NavbarLink } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
