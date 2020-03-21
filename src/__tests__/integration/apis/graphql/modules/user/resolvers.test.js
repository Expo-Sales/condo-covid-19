import faker from 'faker'

import resolver from '../../../../../../apis/graphql/modules/user/resolvers'
import { truncate } from '../../../../../utils/postgres'
import models from '../../../../../../entities/models'

import { userCanReceiveMessageAndInfected } from '../../../../../__fixtures__/user/mock'

describe('User GraphQL Resolver', () => {
  afterEach(async () => {
    try {
      await truncate()
    } catch (error) {
      // do nothing, because there is some tests that don't use data in database
    }
  })

  test('Get User By Token', async () => {
    const User = models.User

    const data = userCanReceiveMessageAndInfected()
    const user = await User.createUser(userCanReceiveMessageAndInfected())

    data.password_hash = user.password_hash
    const result = await resolver.Query.me('', '', { session: { user } })

    expect(result.email).toBe(data.email)
  })

  test('Create User', async () => {
    const data = userCanReceiveMessageAndInfected()
    data.password = faker.random.uuid()

    const result = await resolver.Mutation.createUser('', { data: data })

    const resultData = await result.get({ plain: true })
    expect(resultData.email).toBe(data.email)
  })

  test('Create User with invalid email', async () => {
    const data = userCanReceiveMessageAndInfected()
    data.email = 'emailinvalid'

    try {
      await resolver.Mutation.createUser('', { data: data })
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Invalid email. Please enter a valid email address to continue.')
    }

    expect.assertions(2)
  })

  test('Create User with invalid cellphone', async () => {
    const data = userCanReceiveMessageAndInfected()
    data.cellphone = '111'

    try {
      await resolver.Mutation.createUser('', { data: data })
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Cellphone must contain at least 11 numbers.')
    }

    expect.assertions(2)
  })

  test('Update User', async () => {
    const data = userCanReceiveMessageAndInfected()

    const User = models.User
    const user = await User.createUser(data)
    const session = { user }

    const newData = userCanReceiveMessageAndInfected()
    newData.is_infected = false

    const result = await resolver.Mutation.updateUser('', { data: newData }, { session })
    expect(result.is_infected).toBe(newData.is_infected)
  })

  test('Update User with user not found', async () => {
    const newData = userCanReceiveMessageAndInfected()

    try {
      await resolver.Mutation.updateUser('', { data: newData }, { session: {} })
    } catch (error) {
      expect(error.message).toBe('User not found')
      expect(error).toBeInstanceOf(Error)
    }

    expect.assertions(2)
  })

  test('Delete User', async () => {
    const data = userCanReceiveMessageAndInfected()
    const User = models.User

    const user = await User.createUser(data)

    const deleted = await resolver.Mutation.deleteUser('', '', { session: { user } })

    expect(deleted).toBeTruthy()
  })

  test('Delete User with user not found', async () => {
    try {
      await resolver.Mutation.deleteUser('', '', { session: {} })
    } catch (error) {
      expect(error.message).toBe('User not found')
      expect(error).toBeInstanceOf(Error)
    }

    expect.assertions(2)
  })
})
