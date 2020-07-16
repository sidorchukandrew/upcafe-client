import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { UsersRoutingModule } from "./users-routing.module";
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
import { CartComponent } from "./components/cart/cart.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { EatsComponent } from "./components/menu/eats/eats.component";
import {
  ItemDetailsComponent,
} from "./components/menu/item-details/item-details.component";
import { ModListDetailsComponent } from "./components/menu/mod-list-details/mod-list-details.component";
import { DrinksComponent } from "./components/menu/drinks/drinks.component";
import { SnacksComponent } from "./components/menu/snacks/snacks.component";
import { SweetsComponent } from "./components/menu/sweets/sweets.component";
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
import { UserResponseDialog } from './components/menu/eats/user-response-dialog.component';
import { SuccessfulUpdateDialog } from './components/successful-update-dialog/successful-update-dialog.component';
import  { ItemDetailsSheet } from './components/item-details-sheet/item-details-sheet.component';
import { ModifierListComponent } from './components/modifier-list/modifier-list.component';
import { EditOrderItemComponent } from './components/edit-order-item/edit-order-item.component';
import { NavbarModule } from '../navbar/navbar.module';
import { HeaderWithSearchModule } from '../header-with-search/header-with-search.module';
import { PickupTimeSelectorSheet } from './components/pickup-time-selector-sheet/pickup-time-selector-sheet.component';
import { SwitchToSmallerScreenComponent } from './components/switch-to-smaller-screen/switch-to-smaller-screen.component';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { PageHeaderModule } from '../page-header/page-header.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ConfirmDeleteOwnAccountDialogModule } from '../confirm-delete-own-account-dialog/confirm-delete-own-account-dialog.module';
import { ConfirmDeleteOwnAccountDialog } from '../confirm-delete-own-account-dialog/components/confirm-delete-own-account-dialog/confirm-delete-own-account-dialog.component';

@NgModule({
  declarations: [
    UserComponent,
    MenuComponent,
    CartComponent,
    ProfileComponent,
    EatsComponent,
    ItemDetailsComponent,
    ModListDetailsComponent,
    UserResponseDialog,
    DrinksComponent,
    SnacksComponent,
    SweetsComponent,
    PaymentComponent,
    BeginOrderComponent,
    MyOrderComponent,
    TrackOrderComponent,
    SettingsComponent,
    OrderSummaryComponent,
    ItemDetailsSheet, MultipleSelectorComponent, EditOrderItemSheet, SingleSelectionGroupComponent, SuccessfulUpdateDialog,
    ModifierListComponent,
    EditOrderItemComponent,
    PickupTimeSelectorSheet,
    SwitchToSmallerScreenComponent,
    CategorySelectorComponent,
    UserProfileComponent
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
    FeedbackModule,
    NavbarModule,
    HeaderWithSearchModule,
    PageHeaderModule,
    ConfirmDeleteOwnAccountDialogModule
  ],
  entryComponents: [UserResponseDialog, ItemDetailsSheet, EditOrderItemSheet,
    SuccessfulUpdateDialog, PickupTimeSelectorSheet, ConfirmDeleteOwnAccountDialog],
  providers: [CurrencyPipe],
})
export class UsersModule {}
