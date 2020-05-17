import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "../components/sign-in/sign-in.component";
import { SignInOptionsComponent } from "../components/sign-in-options/sign-in-options.component";

const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "roles", component: SignInOptionsComponent },
  {
    path: "user",
    loadChildren: () =>
      import("../modules/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "admin",
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
