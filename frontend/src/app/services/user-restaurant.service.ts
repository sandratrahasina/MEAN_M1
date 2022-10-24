import { HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { CREATE_MENU, GET_MY_MENUS } from '../utils/const'
import UserService from './user.service'

export type RestaurantMenuType = {
  id: string
  nom: string
  prix: number
  visible: boolean
  photoUrl: string
}

@Injectable({ providedIn: 'root' })
export default class UserRestaurantService {
  #_menus: RestaurantMenuType[]
  #_httpHeader: HttpHeaders = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.userService.token}`
  )

  constructor(private apollo: Apollo, private userService: UserService) {
    this.#_menus = []
  }

  get Menus() {
    return this.#_menus
  }

  set Menus(menus: RestaurantMenuType[]) {
    this.#_menus = menus
  }

  clear() {
    this.#_menus = []
  }

  fetchMenus(
    onSuccess?: (_loadingstate: boolean) => void,
    onError?: () => void
  ) {
    this.apollo
      .watchQuery<{ myMenus: RestaurantMenuType[] }>({
        query: GET_MY_MENUS,
        context: {
          headers: this.#_httpHeader,
        },
      })
      .valueChanges.subscribe(result => {
        if (result.error || result.data.myMenus.length === 0) {
          onError && onError()
          return
        }
        this.#_menus = result.data.myMenus
        onSuccess && onSuccess(result.loading)
      })
  }

  createMenu(
    menusData: { imageFile: File; nom: String; prix: number; visible: Boolean },
    onSuccess?: () => void,
    onError?: () => void
  ) {
    this.apollo
      .mutate<{ createMenu: RestaurantMenuType }>({
        mutation: CREATE_MENU,
        variables: menusData,
        context: {
          useMultipart: true,
          headers: this.#_httpHeader,
        },
      })
      .subscribe(
        ({ data }) => {
          if (!data || Object.entries(data.createMenu).length === 0) {
            onError && onError()
            return
          }
          this.#_menus = [...this.#_menus, data.createMenu]
          onSuccess && onSuccess()
        },
        () => {
          onError && onError()
        }
      )
  }
}
