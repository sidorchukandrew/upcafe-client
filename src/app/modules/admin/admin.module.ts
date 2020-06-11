import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { MatDividerModule, MatBottomSheetModule } from '@angular/material';
import { UserDetailsSheet } from './components/user-details-sheet/user-details-sheet.component';



@NgModule({
  declarations: [DashboardComponent, UsersComponent, UserDetailsSheet],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDividerModule,
    MatBottomSheetModule
  ],
  entryComponents: [
    UserDetailsSheet
  ]
})
export class AdminModule { }
