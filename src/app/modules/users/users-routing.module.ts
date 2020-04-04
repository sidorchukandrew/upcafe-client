import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { MenuComponent } from './components/menu/menu.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EatsComponent } from './components/menu/eats/eats.component';
import { ItemDetailsComponent } from './components/menu/item-details/item-details.component';
import { ModListDetailsComponent } from './components/menu/mod-list-details/mod-list-details.component';
import { DrinksComponent } from './components/menu/drinks/drinks.component';
import { SnacksComponent } from './components/menu/snacks/snacks.component';
import { SweetsComponent } from './components/menu/sweets/sweets.component';
import { EditItemComponent } from './components/cart/edit-item/edit-item.component';
import { PaymentComponent } from './components/cart/payment/payment.component';
import { PickupComponent } from './components/cart/pickup/pickup.component';


const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children:
            [
                { path: 'menu', component: MenuComponent },
                { path: 'favorites', component: FavoritesComponent },
                { path: 'cart', component: CartComponent },
                { path: 'profile', component: ProfileComponent },
                { path: 'menu/eats', component: EatsComponent },
                { path: 'menu/drinks', component: DrinksComponent },
                { path: 'menu/snacks', component: SnacksComponent },
                { path: 'menu/sweets', component: SweetsComponent },
                { path: 'cart/pickup', component: PickupComponent }

            ]
    },
    { path: 'menu/eats/:id', component: ItemDetailsComponent },
    { path: 'menu/snacks/:id', component: ItemDetailsComponent },
    { path: 'menu/drinks/:id', component: ItemDetailsComponent },
    { path: 'cart/edit/:id', component: EditItemComponent },
    { path: 'menu/sweets/:id', component: ItemDetailsComponent },
    { path: 'cart/payment', component: PaymentComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
