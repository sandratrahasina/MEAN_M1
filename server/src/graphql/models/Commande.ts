import { enumType, inputObjectType, objectType } from 'nexus'

export const Etat = enumType({
  name: 'Etat',
  members: ['ATTENTE', 'LIVREE', 'ANNULEE'],
  description: `Les différents états possibles d'une commande :
  - ATTENTE : pour une commande effectuée par l'utilisateur
  - LIVREE : après la livraison de la commande
  - ANNULEE : pour les commandes annulées par les utilisateurs`,
})

export const CommandeDetails = objectType({
  name: 'CommandeDetails',
  definition(t) {
    t.field('menu', { type: 'MenuReturnedType' })
    t.int('quantite')
  },
})

export const CommandeDetailsInput = inputObjectType({
  name: 'CommandeDetailsInput',
  definition(t) {
    t.nonNull.string('menuId')
    t.int('quantite')
  },
})

const Commande = objectType({
  name: 'Commande',
  definition(t) {
    t.string('id')
    t.date('date')
    t.field('client', { type: 'Client' })
    t.field('etat', { type: 'Etat' })
    t.list.field('details', { type: 'CommandeDetails' })
    t.field('livreur', { type: 'Livreur' })
  },
})

export default Commande
