import { objectType } from 'nexus'

const Menu = objectType({
  name: 'Menu',
  definition(t) {
    t.string('id')
    t.string('photoUrl')
    t.string('nom')
    t.int('prix')
    t.boolean('visible')
    t.field('restaurant', { type: 'Restaurant' })
  },
})

export const MenuReturnedType = objectType({
  name: 'MenuReturnedType',
  definition(t) {
    t.string('id')
    t.string('nom')
    t.string('photoUrl')
    t.int('prix')
    t.field('restaurant', { type: 'Restaurant' })
  },
})

export default Menu
