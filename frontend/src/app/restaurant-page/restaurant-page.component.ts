import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import Restaurant from '../models/Restaurant.model'
import RestaurantService from '../services/restaurant.service'

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css'],
})
export class RestaurantPageComponent implements OnInit {
  restaurant!: Restaurant
  loading!: boolean
  error!: {
    isError: boolean
    message?: string
  }

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true
    this.error = { isError: false }
    const restaurantId = this.route.snapshot.params['id']
    this.getRestaurant(restaurantId)
  }

  getRestaurant(restaurantId: string) {
    this.restaurantService.getRestaurantById(
      restaurantId,
      (loading: boolean, restaurant: Restaurant) => {
        this.restaurant = restaurant
        this.loading = loading
      },
      () => {
        this.loading = false
        this.error = { isError: true, message: 'Restaurant inéxistant' }
        throw new Error('Restaurant inéxistant')
      }
    )
  }
}
