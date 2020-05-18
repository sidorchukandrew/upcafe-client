import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { MenuComponent } from "./components/menu/menu.component";
import { HomeComponent } from "./components/home/home.component";
import { CartComponent } from "./components/cart/cart.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { EatsComponent } from "./components/menu/eats/eats.component";
import { ItemDetailsComponent } from "./components/menu/item-details/item-details.component";
import { ModListDetailsComponent } from "./components/menu/mod-list-details/mod-list-details.component";
import { DrinksComponent } from "./components/menu/drinks/drinks.component";
import { SnacksComponent } from "./components/menu/snacks/snacks.component";
import { SweetsComponent } from "./components/menu/sweets/sweets.component";
import { EditItemComponent } from "./components/cart/edit-item/edit-item.component";
import { PaymentComponent } from "./components/cart/payment/payment.component";
import { SettingsComponent } from './components/profile/settings/settings.component';
import { AppFeedbackComponent } from "src/app/components/app-feedback/app-feedback.component";
import { BugReportComponent } from "src/app/components/app-feedback/bug-report/bug-report.component";
import { FeatureRequestComponent } from "src/app/components/app-feedback/feature-request/feature-request.component";
import { CustomerGuard } from 'src/app/guards/customer.guard';

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
              { path: "home", component: HomeComponent },
              { path: "cart", component: CartComponent },
              { path: "account", component: ProfileComponent },
              { path: "menu/eats", component: EatsComponent },
              { path: "menu/drinks", component: DrinksComponent },
              { path: "menu/snacks", component: SnacksComponent },
              { path: "menu/sweets", component: SweetsComponent },
            ],
          },
          { path: "menu/eats/:id", component: ItemDetailsComponent },
          { path: "menu/snacks/:id", component: ItemDetailsComponent },
          { path: "menu/drinks/:id", component: ItemDetailsComponent },
          { path: "cart/edit/:id", component: EditItemComponent },
          { path: "menu/sweets/:id", component: ItemDetailsComponent },
          { path: "cart/payment", component: PaymentComponent },
          { path: "account/settings", component: SettingsComponent },
          {
            path: "account/feedback", component: AppFeedbackComponent,
            children: [
              { path: "bugs", component: BugReportComponent },
              { path: "features", component: FeatureRequestComponent }
            ]
          }
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
