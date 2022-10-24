import { Component, OnInit } from '@angular/core'
import Commande from '../models/Commande.model'
import CommandeService from '../services/commande.service'

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css'],
})
export class CommandeListComponent implements OnInit {
  commandes!: Commande[]

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandes = this.commandeService.getCommandes()
  }
}
