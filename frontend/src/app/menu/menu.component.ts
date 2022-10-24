import { Component, Input, OnInit } from '@angular/core'
import Menu from '../models/Menu.model'
import CommandeService from '../services/commande.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() menu!: Menu
  ordered!: number

  constructor(private commandeService: CommandeService) {}

  ngOnInit() {
    this.ordered = this.commandeService.getCommandeCountforMenu(this.menu)
  }

  onAddMenu() {
    this.ordered = this.commandeService.addCommande(this.menu)
  }
}
