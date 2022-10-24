import { Component, Input, OnInit } from '@angular/core'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop'
import { RestaurantMenuType } from '../services/user-restaurant.service'

@Component({
  selector: 'app-my-menus-list',
  templateUrl: './my-menus-list.component.html',
  styleUrls: ['./my-menus-list.component.css'],
})
export class MyMenusListComponent implements OnInit {
  @Input() menusList!: RestaurantMenuType[]
  visibleMenus!: RestaurantMenuType[]
  nonVisibleMenus!: RestaurantMenuType[]
  movedMenu!: {
    id: string
    visible: boolean
  }[]

  constructor() {}

  ngOnInit(): void {
    this.visibleMenus = this.menusList.filter(menu => menu.visible)
    this.nonVisibleMenus = this.menusList.filter(menu => !menu.visible)
    this.movedMenu = []
  }

  onDrop(event: CdkDragDrop<RestaurantMenuType[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}
