import { Injectable } from '@angular/core'
import Restaurant from '../models/Restaurant.model'
import { Apollo, gql } from 'apollo-angular'

@Injectable({ providedIn: 'root' })
export default class RestaurantService {
  #_restaurants: Restaurant[]

  constructor(private apollo: Apollo) {
    this.#_restaurants = []
  }

  get Restaurants() {
    return this.#_restaurants
  }

  set Restaurants(value: Restaurant[]) {
    this.#_restaurants = value
  }

  getRestaurants(
    onSuccess?: (_loadingstate: boolean) => void,
    onError?: () => void
  ) {
    this.apollo
      .watchQuery<{ restaurants: Restaurant[] }>({
        query: gql`
          {
            restaurants {
              id
              nom
              description
              adresse
              photoUrl
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        if (result.error) {
          onError && onError()
          return
        }
        this.#_restaurants = result.data.restaurants
        onSuccess && onSuccess(result.loading)
      })
  }

  getRestaurantById(
    id: string,
    onSuccess: (_loadingstate: boolean, _restaurant: Restaurant) => void,
    onError?: () => void
  ) {
    const foundRestaurant: Restaurant | undefined = this.Restaurants.find(
      restaurant => restaurant.id === id
    )

    if (foundRestaurant) {
      onSuccess(false, foundRestaurant)
    } else {
      this.apollo
        .watchQuery<{ restaurant: Restaurant | null }>({
          query: gql`
          {
            restaurant(restaurantId: "${id}") {
              id
              nom
              description
              adresse
              photoUrl
            }
          }
        `,
        })
        .valueChanges.subscribe(result => {
          if (result.error || result.data.restaurant === null) {
            onError && onError()
            return
          } else {
            this.Restaurants.push(result.data.restaurant)
            onSuccess(result.loading, result.data.restaurant)
          }
        })
    }
  }
}
