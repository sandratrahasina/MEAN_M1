import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import UserService from '../services/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  asideOpen!: boolean

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.asideOpen = false
  }

  getLoginState() {
    return this.userService.LoginState
  }

  onAsideToggle(open: boolean) {
    this.asideOpen = open
  }

  onSignupClick() {
    this.router.navigateByUrl('signup')
  }

  onLoginClick() {
    this.router.navigateByUrl('login')
  }

  onAccountClick() {
    this.router.navigateByUrl('account')
  }
}
