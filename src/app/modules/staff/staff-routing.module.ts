import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StaffComponent } from "./staff/staff.component";
import { IncomingOrdersComponent } from "./components/incoming-orders/incoming-orders.component";
import { HoursComponent } from "./components/cafe/hours/hours.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { ActiveOrdersComponent } from "./components/active-orders/active-orders.component";
import { CompletedOrdersComponent } from "./components/completed-orders/completed-orders.component";
import { ReadyOrdersComponent } from "./components/ready-orders/ready-orders.component";
import { PickupTimesComponent } from "./components/cafe/pickup-times/pickup-times.component";
import { AppSettingsComponent } from "./components/app-settings/app-settings.component";
import { AppFeedbackComponent } from "src/app/components/app-feedback/app-feedback.component";
import { BugReportComponent } from "src/app/components/app-feedback/bug-report/bug-report.component";
import { FeatureRequestComponent } from "src/app/components/app-feedback/feature-request/feature-request.component";

const routes = [
  {
    path: "",
    component: StaffComponent,
    children: [
      {
        path: "orders",
        component: OrdersComponent,
        children: [
          { path: "new", component: IncomingOrdersComponent },
          { path: "active", component: ActiveOrdersComponent },
          { path: "ready", component: ReadyOrdersComponent },
          { path: "completed", component: CompletedOrdersComponent },
        ],
      },
      { path: "cafe", component: SettingsComponent },
    ],
  },
  { path: "orders/:id", component: OrderDetailsComponent },
  { path: "cafe/hours", component: HoursComponent },
  { path: "cafe/pickup", component: PickupTimesComponent },
  { path: "cafe/app", component: AppSettingsComponent },
  {
    path: "feedback",
    component: AppFeedbackComponent,
    children: [
      { path: "bugs", component: BugReportComponent },
      { path: "features", component: FeatureRequestComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
