import { ApolloServer } from 'apollo-server-express'
import { AppointmentsResolver } from '../appointments'
import { Express } from 'express'
import path from 'node:path'
import { buildSchema } from 'type-graphql'

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [AppointmentsResolver],
    emitSchemaFile: path.resolve(__dirname, '../appointments/schema.gql'),
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  return server
}

export { bootstrap }
