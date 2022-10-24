import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import UserRestaurantService, {
  RestaurantMenuType,
} from '../services/user-restaurant.service'
import UserService from '../services/user.service'

@Component({
  selector: 'app-user-restaurant',
  templateUrl: './user-restaurant.component.html',
  styleUrls: ['./user-restaurant.component.css'],
})
export class UserRestaurantComponent implements OnInit {
  id!: string | null | undefined
  nom!: string | null | undefined
  adresse!: string | null | undefined
  photoUrl!: string | null | undefined
  currentTab!: 'CreateMenu' | 'Menus' | 'Commandes' | 'Loading' | 'Error'
  errorMessage!: string
  menus!: RestaurantMenuType[]

  constructor(
    private userService: UserService,
    private userRestaurantService: UserRestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.userService.user.id
    this.nom = this.userService.user.nom
    this.adresse = this.userService.user.adresse
    this.photoUrl = this.userService.user.photoUrl
    this.currentTab = 'Menus'
    this.errorMessage = ''
    this.menus = this.userRestaurantService.Menus

    this.fetchMenus()
  }

  onLogOut() {
    this.userService.logout()
    this.userRestaurantService.clear()
    this.router.navigateByUrl('')
    this.menus = []
  }

  fetchMenus = () => {
    this.currentTab = 'Loading'
    this.userRestaurantService.fetchMenus(
      this.onFetchSuccess,
      this.onFetchError
    )
  }

  onCreateMenu = () => {
    this.currentTab = 'CreateMenu'
  }

  onMenuCreated = () => {
    this.menus = this.userRestaurantService.Menus
    this.currentTab = 'Menus'
  }

  onCancelCreateMenu = () => {
    this.currentTab = 'Menus'
  }

  onFetchSuccess = (loading: boolean) => {
    this.menus = this.userRestaurantService.Menus
    this.currentTab = loading ? 'Loading' : 'Menus'
  }

  onFetchError = () => {
    this.errorMessage = `Désolé, nous n'avons pas pu récupérer les informations`
    this.currentTab = 'Error'
  }
}
