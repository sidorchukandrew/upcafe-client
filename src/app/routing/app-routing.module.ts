import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "../components/sign-in/sign-in.component";
import { StaffSignInComponent } from "../components/staff-sign-in/staff-sign-in.component";
import { BugReportComponent } from "../components/app-feedback/bug-report/bug-report.component";
import { AppFeedbackComponent } from "../components/app-feedback/app-feedback.component";
import { FeatureRequestComponent } from "../components/app-feedback/feature-request/feature-request.component";

const routes: Routes = [
  { path: "", component: SignInComponent },
  {
    path: "user",
    loadChildren: () =>
      import("../modules/users/users.module").then((m) => m.UsersModule),
  },
  { path: "signin/staff", component: StaffSignInComponent },
  {
    path: "staff/admin",
    loadChildren: () =>
      import("../admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "staff",
    loadChildren: () =>
      import("../modules/staff/staff.module").then((m) => m.StaffModule),
  },
  { path: "", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
