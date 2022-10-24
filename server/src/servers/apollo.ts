import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { GraphQLSchema } from 'graphql'
import { IPrismaContext } from '../utils/types'

export default function createApolloServer(
  schema: GraphQLSchema,
  context: IPrismaContext,
  httpServer: http.Server
) {
  return new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1] || ''
      return {
        token,
        prisma: context.prisma,
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
}
