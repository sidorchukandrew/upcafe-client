import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UsersRoutingModule } from "./users-routing.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserComponent } from "./user/user.component";

import {
  MatIconModule,
  MatRippleModule,
  MatButtonModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatBadgeModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatBottomSheetModule,
  MatChipsModule
} from "@angular/material";
import { MenuComponent } from "./components/menu/menu.component";
import { HomeComponent } from "./components/home/home.component";
import { CartComponent } from "./components/cart/cart.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { EatsComponent, ItemDetailsSheet } from "./components/menu/eats/eats.component";
import {
  ItemDetailsComponent,
  UserResponseDialog,
} from "./components/menu/item-details/item-details.component";
import { ModListDetailsComponent } from "./components/menu/mod-list-details/mod-list-details.component";
import { DrinksComponent } from "./components/menu/drinks/drinks.component";
import { SnacksComponent } from "./components/menu/snacks/snacks.component";
import { SweetsComponent } from "./components/menu/sweets/sweets.component";
import { EditItemComponent } from "./components/cart/edit-item/edit-item.component";
import { PaymentComponent } from "./components/cart/payment/payment.component";
import { BeginOrderComponent } from "./components/cart/begin-order/begin-order.component";
import { MyOrderComponent } from "./components/cart/my-order/my-order.component";
import { TrackOrderComponent } from "./components/cart/track-order/track-order.component";
import { SettingsComponent } from "./components/profile/settings/settings.component";
import { OrderSummaryComponent } from "./components/cart/order-summary/order-summary.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MultipleSelectorComponent } from './selector/selector.component';
import { StatusTrackerModule } from '../status-tracker/status-tracker.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { EditOrderItemSheet } from './components/edit-order-item-sheet/edit-order-item-sheet.component';
import { SingleSelectionGroupComponent } from './components/single-selection-group/single-selection-group.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    UserComponent,
    MenuComponent,
    HomeComponent,
    CartComponent,
    ProfileComponent,
    EatsComponent,
    ItemDetailsComponent,
    ModListDetailsComponent,
    UserResponseDialog,
    DrinksComponent,
    SnacksComponent,
    SweetsComponent,
    EditItemComponent,
    PaymentComponent,
    BeginOrderComponent,
    MyOrderComponent,
    TrackOrderComponent,
    SettingsComponent,
    OrderSummaryComponent,
    ItemDetailsSheet, MultipleSelectorComponent, EditOrderItemSheet, SingleSelectionGroupComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDividerModule,
    MatChipsModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    StatusTrackerModule,
    FeedbackModule
  ],
  entryComponents: [UserResponseDialog, ItemDetailsSheet, EditOrderItemSheet],
  providers: [],
})
export class UsersModule {}
