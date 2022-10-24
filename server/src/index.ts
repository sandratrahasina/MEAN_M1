import http from 'http'
import dotenv from 'dotenv'
import { graphqlUploadExpress } from 'graphql-upload'
import app from './servers/express'
import createApolloServer from './servers/apollo'
import schema from './graphql/schema'
import { context } from './utils/consts'

dotenv.config()

async function start() {
  const httpServer = http.createServer(app)
  const server = createApolloServer(schema, context, httpServer)

  await server.start()

  app.use(graphqlUploadExpress())
  server.applyMiddleware({ app })
  await new Promise<void>(resolve =>
    // eslint-disable-next-line no-promise-executor-return
    httpServer.listen({ port: process.env.PORT }, resolve)
  )
  // TODO: don't forget to remove 'console.log' before send in prod
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}
    -for REST at /api
    -for GraphQL et /graphql
  `)
}

start()
