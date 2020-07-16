import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { MenuComponent } from "./components/menu/menu.component";
import { CartComponent } from "./components/cart/cart.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { EatsComponent } from "./components/menu/eats/eats.component";
import { ItemDetailsComponent } from "./components/menu/item-details/item-details.component";
import { DrinksComponent } from "./components/menu/drinks/drinks.component";
import { SnacksComponent } from "./components/menu/snacks/snacks.component";
import { SweetsComponent } from "./components/menu/sweets/sweets.component";
import { PaymentComponent } from "./components/cart/payment/payment.component";
import { SettingsComponent } from './components/profile/settings/settings.component';
import { AppFeedbackComponent } from "src/app/modules/feedback/app-feedback/app-feedback.component";
import { BugReportComponent } from "src/app/modules/feedback/app-feedback/bug-report/bug-report.component";
import { FeatureRequestComponent } from "src/app/modules/feedback/app-feedback/feature-request/feature-request.component";
import { CustomerGuard } from 'src/app/guards/customer.guard';
import { EditOrderItemComponent } from './components/edit-order-item/edit-order-item.component';
import { SwitchToSmallerScreenComponent } from './components/switch-to-smaller-screen/switch-to-smaller-screen.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [CustomerGuard],
    children: [
      {
        path: "",
        canActivateChild: [CustomerGuard],
        children: [
          {
            path: "",
            component: UserComponent,
            children: [
              { path: "menu", component: MenuComponent },
              { path: "cart", component: CartComponent },
              { path: "account", component: ProfileComponent },
              { path: "menu/eats", component: EatsComponent },
              { path: "menu/drinks", component: DrinksComponent },
              { path: "menu/snacks", component: SnacksComponent },
              { path: "menu/sweets", component: SweetsComponent },
            ],
          },
          { path: "menu/:id", component: ItemDetailsComponent },
          { path: "cart/payment", component: PaymentComponent },
          { path: "account/settings", component: SettingsComponent },
          { path: "account/profile", component: UserProfileComponent },
          { path: "cart/edit/:id", component: EditOrderItemComponent },
          {
            path: "account/feedback", component: AppFeedbackComponent,
            children: [
              { path: "bugs", component: BugReportComponent },
              { path: "features", component: FeatureRequestComponent }
            ]
          },
          { path: "switch", component: SwitchToSmallerScreenComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
