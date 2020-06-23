import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { MatDividerModule, MatBottomSheetModule, MatIconModule, MatButtonModule, MatRippleModule, MatGridListModule } from '@angular/material';
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



@NgModule({
  declarations: [DashboardComponent, UsersComponent, UserDetailsSheet, AdminComponent, CafeSettingsMenuComponent, CatalogItemImageComponent, CatalogComponent, CatalogItemViewComponent, MenuItemSummaryComponent, ModifierSummaryComponent, ModifierListSummaryComponent],
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
    NavbarModule
  ],
  entryComponents: [
    UserDetailsSheet
  ]
})
export class AdminModule { }
