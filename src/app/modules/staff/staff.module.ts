import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StaffRoutingModule } from "./staff-routing.module";
import { IncomingOrdersComponent } from "./components/incoming-orders/incoming-orders.component";
import { StaffComponent } from "./components/staff/staff.component";
import {
  HoursComponent,
  SelectTimeComponent,
} from "./components/cafe/hours/hours.component";
import { MatDividerModule } from "@angular/material/divider";
import {
  MatRippleModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { SettingsComponent } from "./components/settings/settings.component";
import { StaffNavbarComponent } from "./components/staff-navbar/staff-navbar.component";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { ActiveOrdersComponent } from "./components/active-orders/active-orders.component";
import { ReadyOrdersComponent } from "./components/ready-orders/ready-orders.component";
import { CompletedOrdersComponent } from "./components/completed-orders/completed-orders.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PickupTimesComponent } from "./components/cafe/pickup-times/pickup-times.component";
import { AppSettingsComponent } from "./components/app-settings/app-settings.component";
import { CustomerInfoComponent } from "./components/customer-info/customer-info.component";
import { OrderItemDetailsComponent } from "./components/order-item-details/order-item-details.component";
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemInventoryComponent } from './components/item-inventory/item-inventory.component';
import { ModifierListInventoryComponent } from './components/modifier-list-inventory/modifier-list-inventory.component';
import { StatusTrackerModule } from '../status-tracker/status-tracker.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { StaffAccountMenuComponent } from './components/staff-account-menu/staff-account-menu.component';
import { CatalogViewComponent } from './components/catalog-view/catalog-view.component';
import { CatalogItemDialogComponent } from './components/catalog-item-dialog/catalog-item-dialog.component';

@NgModule({
  declarations: [
    IncomingOrdersComponent,
    StaffComponent,
    HoursComponent,
    SettingsComponent,
    StaffNavbarComponent,
    OrderDetailsComponent,
    ActiveOrdersComponent,
    ReadyOrdersComponent,
    CompletedOrdersComponent,
    OrdersComponent,
    SelectTimeComponent,
    PickupTimesComponent,
    AppSettingsComponent,
    CustomerInfoComponent,
    OrderItemDetailsComponent,
    InventoryComponent,
    ItemInventoryComponent,
    ModifierListInventoryComponent,
    StaffAccountMenuComponent,
    CatalogViewComponent,
    CatalogItemDialogComponent,
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    MatDividerModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressBarModule,
    FormsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    StatusTrackerModule,
    FeedbackModule
  ],
  entryComponents: [SelectTimeComponent],
})
export class StaffModule {}
