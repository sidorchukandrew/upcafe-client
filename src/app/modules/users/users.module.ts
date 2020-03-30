import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersRoutingModule } from './users-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './user/user.component';

import {
  MatIconModule, MatRippleModule, MatButtonModule,
  MatExpansionModule, MatCheckboxModule, MatDividerModule, MatRadioModule, MatSnackBarModule, MatDialogModule,
  MatProgressSpinnerModule, MatChipsModule
} from '@angular/material';
import { MenuComponent } from './components/menu/menu.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EatsComponent } from './components/menu/eats/eats.component';
import { ItemDetailsComponent, UserResponseDialog } from './components/menu/item-details/item-details.component';
import { ModListDetailsComponent } from './components/menu/mod-list-details/mod-list-details.component';
import { DrinksComponent } from './components/menu/drinks/drinks.component';
import { SnacksComponent } from './components/menu/snacks/snacks.component';
import { SweetsComponent } from './components/menu/sweets/sweets.component';
import { EditItemComponent } from './components/cart/edit-item/edit-item.component';
import { PaymentComponent } from './components/cart/payment/payment.component';
import { PickupComponent } from './components/cart/pickup/pickup.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, UserComponent, MenuComponent, FavoritesComponent,
    CartComponent, ProfileComponent, EatsComponent, ItemDetailsComponent, ModListDetailsComponent, UserResponseDialog, DrinksComponent, SnacksComponent,
    SweetsComponent, EditItemComponent, PaymentComponent, PickupComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatIconModule, MatRippleModule, MatButtonModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, MatRadioModule,
    MatSnackBarModule, MatDialogModule, MatProgressSpinnerModule, DragDropModule, MatChipsModule
  ],
  entryComponents: [UserResponseDialog]
})
export class UsersModule { }
