import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import {
  MatDividerModule, MatBottomSheetModule, MatIconModule, MatButtonModule, MatRippleModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatMenuModule
} from '@angular/material';
import { UserDetailsSheet } from './components/user-details-sheet/user-details-sheet.component';
import { HeaderWithSearchModule } from '../header-with-search/header-with-search.module';
import { AdminComponent } from './components/admin/admin.component';
import { CafeSettingsMenuComponent } from './components/cafe-settings-menu/cafe-settings-menu.component';
import { CatalogItemImageComponent } from './components/catalog-item-image/catalog-item-image.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { SegmentedControlModule } from '../segmented-control/segmented-control.module';
import { CatalogItemViewComponent } from './components/catalog-item-view/catalog-item-view.component';
import { MenuItemSummaryComponent } from './components/menu-item-summary/menu-item-summary.component';
import { ModifierSummaryComponent } from './components/modifier-summary/modifier-summary.component';
import { ModifierListSummaryComponent } from './components/modifier-list-summary/modifier-list-summary.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { AdminAccountMenuComponent } from './components/admin-account-menu/admin-account-menu.component';
import { FeedbackModule } from '../feedback/feedback.module';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';
import { PageHeaderModule } from '../page-header/page-header.module';
import { MenuHeaderModule } from '../menu-header/menu-header.module';
import { ConfirmDeleteOwnAccountDialog } from '../confirm-delete-own-account-dialog/components/confirm-delete-own-account-dialog/confirm-delete-own-account-dialog.component';
import { ConfirmDeleteOwnAccountDialogModule } from '../confirm-delete-own-account-dialog/confirm-delete-own-account-dialog.module';

@NgModule({
  declarations: [DashboardComponent, UsersComponent, UserDetailsSheet, AdminComponent, CafeSettingsMenuComponent,
    CatalogItemImageComponent, CatalogComponent, CatalogItemViewComponent, MenuItemSummaryComponent,
    ModifierSummaryComponent, ModifierListSummaryComponent, AdminAccountMenuComponent, AppSettingsComponent,
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatGridListModule,
    HeaderWithSearchModule,
    SegmentedControlModule,
    NavbarModule,
    SidenavModule,
    MatProgressSpinnerModule,
    FeedbackModule,
    MatSlideToggleModule,
    PageHeaderModule,
    MenuHeaderModule,
    MatMenuModule,
    ConfirmDeleteOwnAccountDialogModule
  ],
  entryComponents: [
    UserDetailsSheet,
    ConfirmDeleteOwnAccountDialog
  ]
})
export class AdminModule { }
