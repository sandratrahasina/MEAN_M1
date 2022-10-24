import { Injectable } from '@angular/core'
import Commande from '../models/Commande.model'
import Menu from '../models/Menu.model'

type ActionOptions = {
  onFound?: (foundCommande: Commande) => void
  onNotFound?: () => void
}

@Injectable({ providedIn: 'root' })
export default class CommandeService {
  commandes: Commande[] = []

  getCommandeCount() {
    return this.commandes.length
  }

  getCommandes() {
    return this.commandes
  }

  getCommandeQuantite(
    menu: Menu,
    defaultReturn: number = 0,
    actions?: ActionOptions
  ) {
    const selectedCommande = this.commandes.find(commande =>
      commande.menu.equals(menu)
    )
    if (selectedCommande) {
      actions?.onFound && actions.onFound(selectedCommande)
      return selectedCommande.quantite
    } else {
      actions?.onNotFound && actions.onNotFound()
      return defaultReturn
    }
  }

  getCommandeCountforMenu(menu: Menu) {
    return this.getCommandeQuantite(menu)
  }

  addCommande(menu: Menu) {
    return this.getCommandeQuantite(menu, 1, {
      onFound: foundCommande => foundCommande.quantite++,
      onNotFound: () => this.commandes.push(new Commande(menu)),
    })
  }
}
