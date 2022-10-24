import { Component, Input, OnInit } from '@angular/core'
import MenusService from '../services/menus.service'
import Menu from '../models/Menu.model'

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit {
  @Input() restaurantId?: string
  menus!: Menu[]
  loading!: boolean
  error!: {
    isError: boolean
    message?: string
  }

  constructor(private menusService: MenusService) {}

  ngOnInit() {
    this.loading = true
    this.menus = []
    this.error = { isError: false }

    this.fetch()
  }

  fetch() {
    if (this.restaurantId) {
      this.menusService.getMenusByrestaurant(
        this.restaurantId,
        this.onfetchSuccess,
        this.onfetchError
      )
    } else {
      this.menusService.getMenus(this.onfetchSuccess, this.onfetchError)
    }
  }

  private onfetchSuccess = (loadingState: boolean) => {
    this.menus = this.menusService.Menu
    this.loading = loadingState
  }

  private onfetchError = () => {
    this.loading = false
    this.error = {
      isError: true,
      message: `Nous n'avons pas pu trouver les menus`,
    }
  }
}
