import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  {
    path: "",
    canActivate: [AdminGuard],
    children: [
      {
        path: "",
        canActivateChild: [AdminGuard],
        children: [
          {path: "", component: DashboardComponent}
        ]
      },
      {
        path: "users", component: UsersComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
