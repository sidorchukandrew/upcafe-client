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
  MatBottomSheetModule
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
import { StatusTrackerComponent } from "../staff/components/status-tracker/status-tracker.component";
import { OrderSummaryComponent } from "./components/cart/order-summary/order-summary.component";
import { AppFeedbackComponent } from "src/app/components/app-feedback/app-feedback.component";
import { BugReportComponent } from "src/app/components/app-feedback/bug-report/bug-report.component";
import { FeatureRequestComponent } from "src/app/components/app-feedback/feature-request/feature-request.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectorComponent } from './selector/selector.component';

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
    StatusTrackerComponent,
    OrderSummaryComponent,
    ItemDetailsSheet, AppFeedbackComponent, BugReportComponent, FeatureRequestComponent, SelectorComponent
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
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    ReactiveFormsModule
  ],
  entryComponents: [UserResponseDialog, ItemDetailsSheet],
  providers: [],
})
export class UsersModule {}
