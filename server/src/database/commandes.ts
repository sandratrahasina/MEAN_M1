import { PrismaClient, Prisma } from '.prisma/client'
import { commandeSelection } from '../utils/consts'

async function getCommadeDetails(client: PrismaClient, subjectCommand) {
  const { details: commandeDetails, ...commande } = subjectCommand
  return {
    ...commande,
    details: commandeDetails.map(async detail => ({
      menu: await client.menu.findUnique({
        where: { id: detail.menuId },
        select: {
          id: true,
          nom: true,
          prix: true,
          photoUrl: true,
          restaurant: {
            select: { id: true, nom: true, adresse: true },
          },
        },
      }),
      quantite: detail.quantite,
    })),
  }
}

export async function createCommande(
  client: PrismaClient,
  data: Prisma.CommandeCreateInput
) {
  const createdCommande = await client.commande.create({
    data,
    select: commandeSelection,
  })
  return getCommadeDetails(client, createdCommande)
}

export async function updateCommande(
  client: PrismaClient,
  commandeId: string,
  data: Prisma.CommandeUpdateInput
) {
  const updatedCommande = await client.commande.update({
    where: { id: commandeId },
    data,
    select: commandeSelection,
  })
  return getCommadeDetails(client, updatedCommande)
}

export async function getAllCommandsByClient(
  client: PrismaClient,
  clientId: string
) {
  const foundCommandes = await client.commande.findMany({
    where: { clientId },
    select: commandeSelection,
  })
  return foundCommandes.map(commande => getCommadeDetails(client, commande))
}

export async function getAllCommandsByRestaurant(
  client: PrismaClient,
  restaurantId: string
) {
  const restaurantMenus = await client.menu.findMany({
    where: { restaurantId },
  })
  const menuIds = restaurantMenus.map(menu => menu.id)
  const allCommands = await client.commande.findMany({
    select: commandeSelection,
  })
  const detailedCommandeList = allCommands.map(commande => ({
    ...commande,
    details: commande['details'].filter(detail =>
      menuIds.includes(detail.menuId)
    ),
  }))

  return detailedCommandeList
    .filter(commande => commande.details.length > 0)
    .map(commande => getCommadeDetails(client, commande))
}
