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
                { path: 'menu/eats/:id', component: ItemDetailsComponent }
            ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
