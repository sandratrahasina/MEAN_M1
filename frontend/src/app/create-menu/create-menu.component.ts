import { Component, Input, OnInit } from '@angular/core'
import UserRestaurantService from '../services/user-restaurant.service'

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css'],
})
export class CreateMenuComponent implements OnInit {
  nom!: string
  prix!: number
  imageFile!: File
  visible!: boolean
  @Input() onValidateAction!: () => void
  @Input() onCancelAction!: () => void
  step!: string
  errorMessage: string = 'Mot de passe invalide'
  error!: boolean

  constructor(private userRestaurantService: UserRestaurantService) {}

  ngOnInit(): void {
    this.step = ''
    this.error = false
  }

  onFileChanged(event: any) {
    this.imageFile = event.target.files[0]
  }

  onVisibleChanged(event: any) {
    this.visible = event.target.checked
  }

  onValid() {
    console.log(this.visible)
    this.step = 'wait'
    this.userRestaurantService.createMenu(
      {
        nom: this.nom,
        prix: this.prix,
        imageFile: this.imageFile,
        visible: this.visible,
      },
      this.onValidateAction,
      () => {
        this.errorMessage = `Oups! Quelque chose s'est mal passé !`
        this.error = true
        this.step = ''
      }
    )
  }

  onCancel() {
    this.onCancelAction()
  }
}
