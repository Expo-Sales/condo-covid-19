import faker from 'faker'
import { ApolloServer } from 'apollo-server-lambda'

import { truncate } from '../../../utils/postgres'
import models from '../../../../entities/models'
import authResolver from '../../../../apis/graphql/modules/auth/resolvers'
import handler from '../../../../apis/graphql/handler'
import { userCanReceiveMessageAndInfected } from '../../../__fixtures__/user/mock'
describe('Handler GraphQL', () => {
  beforeAll(async () => {
    try {
      await truncate()
    } catch (error) {
      // do nothing, because there is some tests that don't use data in database
    }
  })

  test('Global context with success', async () => {
    const data = userCanReceiveMessageAndInfected()

    const User = models.User
    await User.createUser(data)

    const token = await authResolver.Mutation.generateToken('', {
      data: { email: data.email, password: 'password123' }
    })

    const server = await handler({ headers: { token } }, { callbackWaitsForEmptyEventLoop: false }, () => {})

    expect(server).toBeInstanceOf(ApolloServer)
  })

  test('Global context with failure', async () => {
    const server = await handler(
      { headers: { token: 'doristoken' } },
      { callbackWaitsForEmptyEventLoop: false },
      () => {}
    )

    expect(server).toBeInstanceOf(ApolloServer)
  })

  test('Global context without token', async () => {
    const server = await handler({ headers: {} }, { callbackWaitsForEmptyEventLoop: false }, () => {})
    expect(server).toBeInstanceOf(ApolloServer)
  })
})
