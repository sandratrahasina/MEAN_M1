import { Component, OnInit } from '@angular/core'
import UserService from '../services/user.service'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  userType!: string

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userType = this.userService.userType || 'error'
  }
}
