import { ApolloServer } from 'apollo-server-express'
import { Resolvers } from '../resolvers'
import { Express } from 'express'
import path from 'node:path'
import { buildSchema } from 'type-graphql'

const bootstrap = async (app: Express) => {
  const schema = await buildSchema({
    resolvers: [Resolvers],
    emitSchemaFile: path.resolve(__dirname, '../resolvers/schema.gql'),
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  console.log(`Server GraphQL running on path ${server.graphqlPath}`)

  server.applyMiddleware({ app })
}

export { bootstrap }
