import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { IncomingOrdersComponent } from './components/incoming-orders/incoming-orders.component';
import { HoursComponent } from './components/cafe/hours/hours.component';

const routes = [
    { path: '', component: StaffComponent },
    { path: 'cafe/hours', component: HoursComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule { }