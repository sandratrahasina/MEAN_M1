import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommandeListComponent } from './commande-list/commande-list.component'
import { HomePageComponent } from './home-page/home-page.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { MenuPageComponent } from './menu-page/menu-page.component'
import { RestaurantPageComponent } from './restaurant-page/restaurant-page.component'
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component'
import { SignupPageComponent } from './signup-page/signup-page.component'
import { UserPageComponent } from './user-page/user-page.component'

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'restaurants',
    component: RestaurantsPageComponent,
  },
  {
    path: 'restaurants/:id',
    component: RestaurantPageComponent,
  },
  {
    path: 'menus',
    component: MenuPageComponent,
  },
  {
    path: 'commandes',
    component: CommandeListComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'account',
    component: UserPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
