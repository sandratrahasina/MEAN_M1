import { extendType, nonNull, stringArg } from 'nexus'
import {
  getAllCommandsByClient,
  getAllCommandsByRestaurant,
} from '../../database/commandes'
import { menuRestaurantSelection, menuSelection } from '../../utils/consts'
import {
  verifyClientAuthorization,
  verifyRestaurantAuthorization,
} from '../../utils/functions'
import { IGraphqlContext } from '../../utils/types'

const Query = extendType({
  type: 'Query',

  definition(t) {
    t.list.field('restaurants', {
      type: 'Restaurant',
      resolve: (_: any, _args: any, ctx: IGraphqlContext) =>
        ctx.prisma.restaurant.findMany({
          select: {
            id: true,
            nom: true,
            adresse: true,
            description: true,
            photoUrl: true,
          },
        }),
    })

    t.field('restaurant', {
      type: 'Restaurant',
      args: {
        restaurantId: nonNull(stringArg()),
      },
      resolve: (_: any, args, ctx: IGraphqlContext) =>
        ctx.prisma.restaurant.findUnique({
          where: { id: args.restaurantId },
          select: {
            id: true,
            nom: true,
            adresse: true,
            description: true,
            photoUrl: true,
          },
        }),
    })

    t.list.field('menus', {
      type: 'MenuReturnedType',
      resolve(_: any, _args: any, ctx: IGraphqlContext) {
        return ctx.prisma.menu.findMany({
          where: {
            visible: true,
          },
          select: menuRestaurantSelection,
        })
      },
    })

    t.list.field('menusByRestaurant', {
      type: 'Menu',
      args: { restaurantId: nonNull(stringArg()) },
      resolve(_, args, ctx: IGraphqlContext) {
        const { restaurantId } = args
        return ctx.prisma.menu.findMany({
          where: { restaurantId, visible: true },
          select: menuRestaurantSelection,
        })
      },
    })

    t.list.field('myMenus', {
      type: 'Menu',
      resolve(_, _args, ctx: IGraphqlContext) {
        const { prisma, token } = ctx
        const restaurantId = verifyRestaurantAuthorization(token)
        return prisma.menu.findMany({
          where: { restaurantId },
          select: menuSelection,
        })
      },
    })

    t.list.field('myCommands', {
      type: 'Commande',
      async resolve(_, _args, ctx: IGraphqlContext): Promise<any> {
        const { token, prisma } = ctx
        const clientId = verifyClientAuthorization(token)
        return getAllCommandsByClient(prisma, clientId)
      },
    })

    t.list.field('receivedCommands', {
      type: 'Commande',
      async resolve(_, _args, ctx: IGraphqlContext): Promise<any> {
        const { token, prisma } = ctx
        const restaurantId = verifyRestaurantAuthorization(token)
        return getAllCommandsByRestaurant(prisma, restaurantId)
      },
    })
  },
})

export default Query
