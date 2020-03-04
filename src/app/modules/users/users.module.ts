import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersRoutingModule } from './users-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './user/user.component';

import { MatIconModule, MatRippleModule } from '@angular/material';


@NgModule({
  declarations: [DashboardComponent, NavbarComponent, UserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatIconModule, MatRippleModule
  ]
})
export class UsersModule { }
