export default class Restaurant {
  public menus: {
    id: string
    nom: string
  }[]

  constructor(
    public id: string,
    public nom: string,
    public adresse: string,
    public photoUrl: string,
    public description: string,
    menus?: {
      id: string
      nom: string
    }[]
  ) {
    this.menus = menus || []
  }
}
