import { ApolloServer } from 'apollo-server-lambda'
import AppModule from './modules/app.module'
import { verifyToken } from '../../common/auth/jwt'

export const globalContext = async ({ event }) => {
  if (event.headers && event.headers.token) {
    return { user: await verifyToken(event.headers.token) }
  }
}

export const formatError = error => {
  return error
}

export const graphql = (event, context, callback) => {
  const server = new ApolloServer({
    modules: [AppModule],
    playground: {
      endpoint: '/graphql'
    },
    debug: process.env.GRAPHQL_DEBUG,
    formatError: formatError,
    context: globalContext
  })

  const handler = server.createHandler({
    cors: {
      origin: '*',
      credenttials: true,
      methods: ['POST', 'GET'],
      allowedHeaders: ['Content-Type', 'Origin', 'Accept']
    }
  })

  handler(event, context, callback)

  return server
}

export default graphql
