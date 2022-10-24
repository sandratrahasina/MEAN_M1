import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import UserService from '../services/user.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  email!: string
  motDePasse!: string
  userTypes!: string[]
  usertype!: string
  step!: string
  errorMessage: string = 'Mot de passe invalide'
  error!: boolean

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userTypes = ['client', 'restaurant', 'livreur', 'admin']
    this.usertype = this.userTypes[0]
    this.step = ''
    this.error = false
  }

  onSubmitForm() {
    this.step = 'wait'
    this.userService.login(
      { email: this.email, motDePasse: this.motDePasse },
      this.usertype,
      () => this.router.navigateByUrl(''),
      () => {
        this.errorMessage = `Oups! Quelque chose s'est mal passé !`
        this.error = true
        this.step = ''
      }
    )
  }
}
