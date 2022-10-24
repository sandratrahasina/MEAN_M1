import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import UserService from '../services/user.service'

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  usertype!: string
  nom!: string
  prenom!: string
  description!: string
  adresse!: string
  photo!: File
  email!: string
  motDePasse!: string
  confirmMotDePasse!: string
  passwordError!: boolean
  selectedUserType!: string
  userTypes!: string[]
  step!: string
  errorMessage: string = 'Mot de passe invalide'
  error!: boolean

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userTypes = ['client', 'restaurant', 'livreur', 'admin']
    this.usertype = this.userTypes[0]
    this.step = 'userType'
    this.error = false
  }

  onPasswordConfirm() {
    this.passwordError = this.motDePasse === this.confirmMotDePasse
  }

  onFileChanged(event: any) {
    this.photo = event.target.files[0]
  }

  onNextStep(nextStep: string) {
    this.step = 'loading'
    setTimeout(() => {
      this.step = nextStep
    }, 150)
  }

  onSubmitForm() {
    if (this.motDePasse !== this.confirmMotDePasse) {
      this.error = true
      return
    } else this.error = false

    this.step = 'wait'
    const formData = new FormData()

    if (this.usertype !== 'admin') {
      formData.append('nom', this.nom)
      if (this.usertype !== 'restaurant') formData.append('prenom', this.prenom)
      if (this.usertype !== 'livreur') formData.append('adresse', this.adresse)
      if (this.usertype === 'restaurant')
        formData.append('description', this.description)
      formData.append('photo', this.photo, this.photo.name)
    }
    formData.append('email', this.email)
    formData.append('motDePasse', this.motDePasse)

    this.userService.signup(
      formData,
      this.usertype,
      () => this.router.navigateByUrl(''),
      () => {
        this.errorMessage = `Oups! Quelque chose s'est mal passé !`
        this.error = true
        this.step = 'userLogin'
      }
    )
  }
}
