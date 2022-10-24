import { Component, OnInit } from '@angular/core'
import Restaurant from '../models/Restaurant.model'
import RestaurantService from '../services/restaurant.service'

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
})
export class RestaurantListComponent implements OnInit {
  restaurants!: Restaurant[]
  loading!: boolean
  error!: {
    isError: boolean
    message?: string
  }

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.loading = true
    this.restaurants = []

    if (this.restaurantService.Restaurants.length === 0)
      // setTimeout(() => this.fetch(), 150)
      this.fetch()
    else {
      this.loading = false
      this.restaurants = this.restaurantService.Restaurants
    }
  }

  fetch() {
    this.restaurantService.getRestaurants((loadingState: boolean) => {
      this.restaurants = this.restaurantService.Restaurants
      this.loading = loadingState
    })
  }
}
