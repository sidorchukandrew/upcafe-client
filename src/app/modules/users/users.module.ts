import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersRoutingModule } from './users-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './user/user.component';

import { MatIconModule, MatRippleModule } from '@angular/material';
import { MenuComponent } from './components/menu/menu.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [DashboardComponent, NavbarComponent, UserComponent, MenuComponent, FavoritesComponent, CartComponent, ProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatIconModule, MatRippleModule
  ]
})
export class UsersModule { }
