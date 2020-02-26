import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { StaffSignInComponent } from '../components/staff-sign-in/staff-sign-in.component';


const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'dashboard', loadChildren: () => import('../modules/users/users.module').then(m => m.UsersModule) },
  { path: 'staff', component: StaffSignInComponent },
  { path: 'staff/admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
  { path: 'staff/workers', loadChildren: () => import('../workers/workers.module').then(m => m.WorkersModule) },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
