import { UserDatasError } from './errors'
import { IAdmin, IClient, ILivreur, IRestaurant } from './types'

export function toAdminData(userData: any): IAdmin {
  if (!userData.email) throw new UserDatasError('email')
  if (!userData.motDePasse) throw new UserDatasError('password')
  return { ...userData }
}

export function toClientData(userData: any): IClient {
  if (!userData.email) throw new UserDatasError('email')
  if (!userData.motDePasse) throw new UserDatasError('password')
  if (!userData.nom) throw new UserDatasError('nom')
  if (!userData.prenom) throw new UserDatasError('prenom')
  if (!userData.adresse) throw new UserDatasError('adresse')
  return { ...userData }
}

export function toLivreurData(userData: any): ILivreur {
  if (!userData.email) throw new UserDatasError('email')
  if (!userData.motDePasse) throw new UserDatasError('password')
  if (!userData.nom) throw new UserDatasError('nom')
  if (!userData.prenom) throw new UserDatasError('prenom')
  return { ...userData }
}

export function toRestaurantData(userData: any): IRestaurant {
  if (!userData.email) throw new UserDatasError('email')
  if (!userData.motDePasse) throw new UserDatasError('password')
  if (!userData.nom) throw new UserDatasError('nom')
  if (!userData.adresse) throw new UserDatasError('adresse')
  return { ...userData }
}
