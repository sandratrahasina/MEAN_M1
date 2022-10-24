import { objectType } from 'nexus'

const Restaurant = objectType({
  name: 'Restaurant',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('nom')
    t.string('description')
    t.string('photoUrl')
    t.string('adresse')
  },
})

export default Restaurant
