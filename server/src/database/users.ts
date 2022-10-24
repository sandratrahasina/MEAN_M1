import { IAdmin, IClient, ILivreur, IRestaurant } from '../utils/types'
import { hashPassword } from '../utils/tools'
import prisma from './prisma'
import { uploadImage } from './cloudinary'

export async function createAdmin(admin: IAdmin) {
  const { email, motDePasse, ...adminData } = admin
  return prisma.admin.create({
    data: {
      ...adminData,
      compte: {
        email,
        motDePasse: await hashPassword(motDePasse),
      },
    },
  })
}

export async function createClient(client: IClient) {
  const { email, motDePasse, photoUrl, ...clientData } = client
  return prisma.client.create({
    data: {
      ...clientData,
      photoUrl: await uploadImage(photoUrl, 'client', email.split('@')[0]),
      compte: {
        email,
        motDePasse: await hashPassword(motDePasse),
      },
    },
  })
}
export async function createLivreur(livreur: ILivreur) {
  const { email, motDePasse, photoUrl, ...livreurData } = livreur
  return prisma.livreur.create({
    data: {
      ...livreurData,
      photoUrl: await uploadImage(photoUrl, 'livreur', email.split('@')[0]),
      compte: {
        email,
        motDePasse: await hashPassword(motDePasse),
      },
    },
  })
}
export async function createRestaurant(restaurant: IRestaurant) {
  const { email, motDePasse, photoUrl, nom, ...restaurantData } = restaurant
  return prisma.restaurant.create({
    data: {
      ...restaurantData,
      nom,
      photoUrl: await uploadImage(
        photoUrl,
        'restaurant',
        `${nom.toLocaleLowerCase().split(' ').join('_')}_${email.split('@')[0]}`
      ),
      compte: {
        email,
        motDePasse: await hashPassword(motDePasse),
      },
    },
  })
}

export async function findAdminByMail(email: string) {
  const admin = await prisma.admin.findFirst({
    where: {
      compte: {
        is: {
          email,
        },
      },
    },
  })
  return admin
}

export async function findClientByMail(email: string) {
  const client = await prisma.client.findFirst({
    where: {
      compte: {
        is: {
          email,
        },
      },
    },
  })
  return client
}

export async function findLivreurByMail(email: string) {
  const livreur = await prisma.livreur.findFirst({
    where: {
      compte: {
        is: {
          email,
        },
      },
    },
  })
  return livreur
}

export async function findRestaurantByMail(email: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      compte: {
        is: {
          email,
        },
      },
    },
  })
  return restaurant
}
