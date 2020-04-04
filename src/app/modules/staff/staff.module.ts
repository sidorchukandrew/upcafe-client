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
import { ActiveOrdersComponent } from './components/active-orders/active-orders.component';
import { LateOrdersComponent } from './components/late-orders/late-orders.component';
import { CompletedOrdersComponent } from './components/completed-orders/completed-orders.component';
import { OrdersComponent } from './components/orders/orders.component';
@NgModule({
  declarations: [IncomingOrdersComponent, StaffComponent, CafeComponent, HoursComponent, SettingsComponent, StaffNavbarComponent, OrderDetailsComponent, ActiveOrdersComponent, LateOrdersComponent, CompletedOrdersComponent, OrdersComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    MatDividerModule, MatRippleModule, MatButtonModule, MatIconModule, MatGridListModule
  ]
})
export class StaffModule { }
