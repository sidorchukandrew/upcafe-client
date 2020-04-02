import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { IncomingOrdersComponent } from './components/incoming-orders/incoming-orders.component';
import { HoursComponent } from './components/cafe/hours/hours.component';
import { SettingsComponent } from './components/settings/settings.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

const routes = [
    {
        path: '',
        component: StaffComponent,
        children: [
            { path: 'orders', component: IncomingOrdersComponent },
            { path: 'cafe', component: SettingsComponent },
            { path: 'cafe/hours', component: HoursComponent },

        ]
    },
    { path: 'orders/:id', component: OrderDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule { }