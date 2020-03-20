import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersRoutingModule } from './users-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './user/user.component';

import {
  MatIconModule, MatRippleModule, MatButtonModule,
  MatExpansionModule, MatCheckboxModule, MatDividerModule, MatRadioModule
} from '@angular/material';
import { MenuComponent } from './components/menu/menu.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EatsComponent } from './components/menu/eats/eats.component';
import { ItemDetailsComponent } from './components/menu/item-details/item-details.component';
import { ModListDetailsComponent } from './components/menu/mod-list-details/mod-list-details.component';


@NgModule({
  declarations: [DashboardComponent, NavbarComponent, UserComponent, MenuComponent, FavoritesComponent, CartComponent, ProfileComponent, EatsComponent, ItemDetailsComponent, ModListDetailsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatIconModule, MatRippleModule, MatButtonModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, MatRadioModule
  ]
})
export class UsersModule { }
