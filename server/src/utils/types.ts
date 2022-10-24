import {
  Admin,
  Client,
  Compte,
  Livreur,
  PrismaClient,
  Restaurant,
} from '@prisma/client'
import { asNexusMethod } from 'nexus'
import { GraphQLDate } from 'graphql-scalars'
import { GraphQLUpload } from 'graphql-upload'

interface ICompte extends Compte {}

export interface IAdmin extends Omit<Admin, 'id'>, ICompte {
  id?: string
}

export interface IClient extends Omit<Client, 'id' | 'photoUrl'>, ICompte {
  id?: string
  photoUrl: IImageType
}

export interface ILivreur extends Omit<Livreur, 'id' | 'photoUrl'>, ICompte {
  id?: string
  photoUrl: IImageType
}

export interface IRestaurant
  extends Omit<Restaurant, 'id' | 'photoUrl'>,
    ICompte {
  id?: string
  photoUrl: IImageType
}

export interface IImageType {
  originalname: string
  mimetype: string
  buffer: Buffer
}

export interface IUserType
  extends Partial<IAdmin>,
    Partial<IClient>,
    Partial<ILivreur>,
    Partial<IRestaurant> {
  email: string
  motDePasse: string
}

export interface IPrismaContext {
  prisma: PrismaClient
}

export interface IGraphqlContext {
  token: string
  prisma: PrismaClient
}

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

export const GQLUpload = asNexusMethod(GraphQLUpload, 'Upload')
