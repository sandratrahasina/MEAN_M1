import Menu from './Menu.model'

export default class Commande {
  public quantite: number
  constructor(public menu: Menu, quantite?: number) {
    this.quantite = quantite || 1
  }
}
