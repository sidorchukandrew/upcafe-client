import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomingOrdersComponent } from './components/incoming-orders/incoming-orders.component';


const routes: Routes = [
    { path: '', component: IncomingOrdersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkersRoutingModule { }
