import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomingOrdersComponent } from './components/incoming-orders/incoming-orders.component';
import { WorkersRoutingModule } from './workers-routing.module';



@NgModule({
  declarations: [IncomingOrdersComponent],
  imports: [
    CommonModule,
    WorkersRoutingModule
  ]
})
export class WorkersModule { }
