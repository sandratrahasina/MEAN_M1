type UserInputType = {
  id?: string | null
  nom?: string | null
  prenom?: string | null
  adresse?: string | null
  photoUrl?: string | null
}

export default class User {
  id?: string | null
  nom?: string | null
  prenom?: string | null
  adresse?: string | null
  photoUrl?: string | null

  constructor(userInput?: UserInputType) {
    if (userInput) {
      this.id = userInput.id
      this.nom = userInput.nom
      this.prenom = userInput.prenom
      this.photoUrl = userInput.photoUrl
      this.adresse = userInput.adresse
    }
  }
}
