import { makeSchema } from 'nexus'
import { join } from 'path'
import { GQLDate, GQLUpload } from '../utils/types'
import {
  Menu,
  Restaurant,
  Commande,
  Etat,
  Client,
  Query,
  MenuReturnedType,
  Mutation,
  CommandeDetails,
  Livreur,
  CommandeDetailsInput,
  FileType,
} from './models'

const schema = makeSchema({
  types: [
    GQLDate,
    GQLUpload,
    FileType,
    Etat,
    Restaurant,
    Menu,
    MenuReturnedType,
    Livreur,
    CommandeDetails,
    Commande,
    CommandeDetailsInput,
    Client,
    Query,
    Mutation,
  ],
  outputs: {
    typegen: join(__dirname, 'nexus-typegen.ts'),
    schema: join(__dirname, '../../', 'schema.graphql'),
  },
})

export default schema
