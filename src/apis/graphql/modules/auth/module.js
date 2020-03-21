import { GraphQLModule } from '@graphql-modules/core'
import typeDefs from './schema'
import resolvers from './resolvers'
import context from '../context'

export const AuthModule = new GraphQLModule({
  typeDefs,
  resolvers,
  context
})
