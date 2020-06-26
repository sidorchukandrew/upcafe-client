import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { UsersComponent } from './components/users/users.component';
import { AdminComponent } from './components/admin/admin.component';
import { CafeSettingsMenuComponent } from './components/cafe-settings-menu/cafe-settings-menu.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CatalogItemViewComponent } from './components/catalog-item-view/catalog-item-view.component';
import { AdminAccountMenuComponent } from './components/admin-account-menu/admin-account-menu.component';
import { AppFeedbackComponent } from '../feedback/app-feedback/app-feedback.component';
import { BugReportComponent } from '../feedback/app-feedback/bug-report/bug-report.component';
import { FeatureRequestComponent } from '../feedback/app-feedback/feature-request/feature-request.component';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';


const routes: Routes = [
  {
    path: "",
    canActivate: [AdminGuard],
    children: [
      {
        path: "",
        canActivateChild: [AdminGuard],
        children: [
          {
            path: "", component: AdminComponent, children: [
              { path: "cafe", component: CafeSettingsMenuComponent },
              {
                path: "account", component: AdminAccountMenuComponent
              },
            ]
          }
        ]
      },
      {
        path: "cafe/users", component: UsersComponent
      },
      {
        path: "cafe/catalog", component: CatalogComponent
      },
      {
        path: "cafe/catalog/:id", component: CatalogItemViewComponent
      },
      {
        path: "feedback",
        component: AppFeedbackComponent,
        children: [
          { path: "bugs", component: BugReportComponent },
          { path: "features", component: FeatureRequestComponent },
        ],
      },
      { path: "account/app", component: AppSettingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
