import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { MatDividerModule, MatBottomSheetModule, MatIconModule, MatButtonModule, MatRippleModule, MatGridListModule } from '@angular/material';
import { UserDetailsSheet } from './components/user-details-sheet/user-details-sheet.component';
import { HeaderWithSearchModule } from '../header-with-search/header-with-search.module';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { CafeSettingsMenuComponent } from './components/cafe-settings-menu/cafe-settings-menu.component';



@NgModule({
  declarations: [DashboardComponent, UsersComponent, UserDetailsSheet, AdminNavbarComponent, AdminComponent, CafeSettingsMenuComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatGridListModule,
    HeaderWithSearchModule
  ],
  entryComponents: [
    UserDetailsSheet
  ]
})
export class AdminModule { }
