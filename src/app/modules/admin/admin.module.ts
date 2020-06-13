import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { MatDividerModule, MatBottomSheetModule, MatIconModule, MatButtonModule, MatRippleModule } from '@angular/material';
import { UserDetailsSheet } from './components/user-details-sheet/user-details-sheet.component';
import { HeaderWithSearchModule } from '../header-with-search/header-with-search.module';



@NgModule({
  declarations: [DashboardComponent, UsersComponent, UserDetailsSheet],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    HeaderWithSearchModule
  ],
  entryComponents: [
    UserDetailsSheet
  ]
})
export class AdminModule { }
