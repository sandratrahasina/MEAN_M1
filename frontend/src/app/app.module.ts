import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { AppComponent } from './app.component'
import { MenuComponent } from './menu/menu.component'
import { registerLocaleData } from '@angular/common'
import * as fr from '@angular/common/locales/fr'
import { RestaurantComponent } from './restaurant/restaurant.component'
import { CommandeComponent } from './commande/commande.component'
import { MenuListComponent } from './menu-list/menu-list.component'
import { CommandeListComponent } from './commande-list/commande-list.component'
import AppRoutingModule from './app-routing.module'
import { HeaderComponent } from './header/header.component'
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component'
import { RestaurantPageComponent } from './restaurant-page/restaurant-page.component'
import { FormsModule } from '@angular/forms'
import { LoginFormComponent } from './login-form/login-form.component'
import { SignupFormComponent } from './signup-form/signup-form.component'
import { HomePageComponent } from './home-page/home-page.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { SignupPageComponent } from './signup-page/signup-page.component'
import { MenuPageComponent } from './menu-page/menu-page.component'
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component'
import { UserPageComponent } from './user-page/user-page.component'
import { UserClientComponent } from './user-client/user-client.component'
import { UserRestaurantComponent } from './user-restaurant/user-restaurant.component'
import { UserAdminComponent } from './user-admin/user-admin.component'
import { UserLivreurComponent } from './user-livreur/user-livreur.component'
import { GraphQLModule } from './graphql.module'
import { CreateMenuComponent } from './create-menu/create-menu.component'
import { MyMenuComponent } from './my-menu/my-menu.component'
import { MyMenusListComponent } from './my-menus-list/my-menus-list.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RestaurantComponent,
    CommandeComponent,
    MenuListComponent,
    CommandeListComponent,
    HeaderComponent,
    RestaurantListComponent,
    RestaurantPageComponent,
    LoginFormComponent,
    SignupFormComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    MenuPageComponent,
    RestaurantsPageComponent,
    UserPageComponent,
    UserClientComponent,
    UserRestaurantComponent,
    UserAdminComponent,
    UserLivreurComponent,
    CreateMenuComponent,
    MyMenuComponent,
    MyMenusListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
    DragDropModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default)
  }
}
