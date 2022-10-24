import { Component, Input, OnInit } from '@angular/core'
import UserRestaurantService, {
  RestaurantMenuType,
} from '../services/user-restaurant.service'

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.css'],
})
export class MyMenuComponent implements OnInit {
  @Input() menu!: RestaurantMenuType

  constructor(private userRestaurantService: UserRestaurantService) {}

  ngOnInit(): void {}
}
