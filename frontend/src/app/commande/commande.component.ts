import { Component, Input, OnInit } from '@angular/core'
import Commande from '../models/Commande.model'

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandeComponent implements OnInit {
  @Input() commande!: Commande

  constructor() {}

  ngOnInit(): void {}
}
