import { Component, OnInit } from '@angular/core'
import User from './models/User.model'
import UserService from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.token = window.localStorage.getItem('token')
    if (this.userService.token) {
      this.userService.LoginState = true
      this.userService.user = new User({
        id: window.localStorage.getItem('id'),
        nom: window.localStorage.getItem('nom'),
        prenom: window.localStorage.getItem('prenom'),
        photoUrl: window.localStorage.getItem('photoUrl'),
        adresse: window.localStorage.getItem('adresse'),
      })
      this.userService.userType = window.localStorage.getItem('userType')
    }
  }
}
