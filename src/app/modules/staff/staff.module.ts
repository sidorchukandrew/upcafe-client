import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffRoutingModule } from './staff-routing.module';
import { IncomingOrdersComponent } from './components/incoming-orders/incoming-orders.component';
import { StaffComponent } from './staff/staff.component';
import { CafeComponent } from './components/cafe/cafe.component';
import { HoursComponent } from './components/cafe/hours/hours.component';
import { MatDividerModule } from '@angular/material/divider'
import { MatRippleModule, MatButtonModule, MatIconModule, MatGridListModule } from '@angular/material';
import { SettingsComponent } from './components/settings/settings.component'
import { StaffNavbarComponent } from './components/staff-navbar/staff-navbar.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
@NgModule({
  declarations: [IncomingOrdersComponent, StaffComponent, CafeComponent, HoursComponent, SettingsComponent, StaffNavbarComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    MatDividerModule, MatRippleModule, MatButtonModule, MatIconModule, MatGridListModule
  ]
})
export class StaffModule { }
