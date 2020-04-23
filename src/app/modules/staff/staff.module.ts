import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StaffRoutingModule } from "./staff-routing.module";
import { IncomingOrdersComponent } from "./components/incoming-orders/incoming-orders.component";
import { StaffComponent } from "./staff/staff.component";
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
import { StatusTrackerComponent } from "./components/status-tracker/status-tracker.component";
import { CustomerInfoComponent } from "./components/customer-info/customer-info.component";
import { OrderItemDetailsComponent } from "./components/order-item-details/order-item-details.component";
import { AppFeedbackComponent } from "src/app/components/app-feedback/app-feedback.component";
import { BugReportComponent } from "src/app/components/app-feedback/bug-report/bug-report.component";
import { FeatureRequestComponent } from "src/app/components/app-feedback/feature-request/feature-request.component";

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
    StatusTrackerComponent,
    CustomerInfoComponent,
    OrderItemDetailsComponent,
    AppFeedbackComponent,
    BugReportComponent,
    FeatureRequestComponent,
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
  ],
  entryComponents: [SelectTimeComponent],
})
export class StaffModule {}
