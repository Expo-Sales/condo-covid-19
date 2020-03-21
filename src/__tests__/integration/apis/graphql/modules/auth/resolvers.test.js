import resolver from '../../../../../../apis/graphql/modules/auth/resolvers'
import { truncate } from '../../../../../utils/postgres'
import { userCanReceiveMessageAndInfected } from '../../../../../__fixtures__/user/mock'
import { verifyToken } from '../../../../../../common/auth/jwt'
import models from '../../../../../../entities/models'

describe('Auth GraphQL Resolver', () => {
  afterEach(async () => {
    try {
      await truncate()
    } catch (error) {
      // do nothing, because there is some tests that don't use data in database
    }
  })

  test('Generate Auth token with success', async () => {
    const User = models.User
    const data = userCanReceiveMessageAndInfected()
    const user = await User.createUser(data)

    const token = await resolver.Mutation.generateToken(null, {
      data: {
        email: data.email,
        password: 'password123'
      }
    })

    const userCheck = await verifyToken(token)

    expect(userCheck.email).toBe(user.email)
  })

  test('Generate Auth token with error', async () => {
    try {
      await resolver.Mutation.generateToken(null, {
        data: {
          email: 'invalid@gmail.com',
          password: 'password123'
        }
      })
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }

    expect.assertions(1)
  })
})
