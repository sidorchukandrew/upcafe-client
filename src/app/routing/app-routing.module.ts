import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { StaffSignInComponent } from '../components/staff-sign-in/staff-sign-in.component';


const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'staff', component: StaffSignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
