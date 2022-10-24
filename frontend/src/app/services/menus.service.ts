import Menu from '../models/Menu.model'
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { HttpHeaders } from '@angular/common/http'
import UserService from './user.service'
import {
  CREATE_MENU,
  GET_MENUS_BY_RESTAURANT,
  GET_MENUS_QUERY,
} from '../utils/const'

@Injectable({ providedIn: 'root' })
export default class MenusService {
  #_menus: Menu[]

  constructor(private apollo: Apollo, private userService: UserService) {
    this.#_menus = []
  }

  get Menu() {
    return this.#_menus
  }

  set Menu(menu: Menu[]) {
    this.#_menus = menu
  }

  getMenus(
    onSuccess?: (_loadingstate: boolean) => void,
    onError?: () => void
  ): void {
    this.apollo
      .watchQuery<{ menus: Menu[] }>({
        query: GET_MENUS_QUERY,
      })
      .valueChanges.subscribe(result => {
        if (result.error || result.data.menus.length === 0) {
          onError && onError()
          return
        }
        this.#_menus = result.data.menus
        onSuccess && onSuccess(result.loading)
      })
  }

  getMenusByrestaurant(
    restaurantId: string,
    onSuccess?: (_loadingstate: boolean) => void,
    onError?: () => void
  ): void {
    this.apollo
      .watchQuery<{ menusByRestaurant: Menu[] }>({
        query: GET_MENUS_BY_RESTAURANT,
        variables: {
          restaurantId,
        },
      })
      .valueChanges.subscribe(result => {
        if (result.error || result.data.menusByRestaurant.length === 0) {
          onError && onError()
          return
        }
        this.#_menus = result.data.menusByRestaurant
        onSuccess && onSuccess(result.loading)
      })
  }

  createMenu(
    menusData: { imageFile: File; nom: String; prix: number; visible: Boolean },
    onSuccess?: () => void,
    onError?: () => void
  ) {
    this.apollo
      .mutate<{ createMenu: Menu }>({
        mutation: CREATE_MENU,
        variables: menusData,
        context: {
          useMultipart: true,
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.userService.token}`
          ),
        },
      })
      .subscribe(
        ({ data }) => {
          if (!data || Object.entries(data.createMenu).length === 0) {
            onError && onError()
            return
          }
          this.Menu = [...this.#_menus, data.createMenu]
          onSuccess && onSuccess()
        },
        () => {
          onError && onError()
        }
      )
  }
}
