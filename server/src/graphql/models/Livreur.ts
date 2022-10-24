import { objectType } from 'nexus'

const Livreur = objectType({
  name: 'Livreur',
  definition(t) {
    t.nonNull.string('id')
    t.string('nom')
    t.string('prenom')
    t.list.field('livraisons', { type: 'Commande' })
  },
})

export default Livreur
